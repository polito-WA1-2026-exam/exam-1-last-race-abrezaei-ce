import { listEvents } from "../repositories/eventRepository.js";
import { createGame, getActiveGameByUserId, getGameById, updateGame } from "../repositories/gameRepository.js";
import { listSegments } from "../repositories/segmentRepository.js";
import { listStations } from "../repositories/stationRepository.js";
import { responseSuccess, responseError } from "../utils/response.js";

const gamesController = {
    get: async (req, res) => {
        const game = await getGameById(req.params.id);

        if (!game || game.user_id !== req.user.id) return responseError(res, null, "Not found", 404);

        game.history = game.history ? JSON.parse(game.history) : [];

        return responseSuccess(res, game, "Game retrieved");
    },

    start: async (req, res) => {
        const activeGame = await getActiveGameByUserId(req.user.id);

        if (activeGame) return responseError(res, null, "You have a game already in progress", 400);

        const stations = await listStations();
        const segments = await listSegments();

        let adjacencyList = {};

        stations.forEach(station => adjacencyList[station.id] = []);
        segments.forEach(segment => {
            adjacencyList[segment.origin].push(segment.destination);
            adjacencyList[segment.destination].push(segment.origin);
        });

        let origin;
        let validDestinations = [];

        while (validDestinations.length === 0) {
            origin = stations[Math.floor(Math.random() * stations.length)];

            const distances = { [origin.id]: 0 };
            const queue = [origin.id];

            while (queue.length > 0) {
                const currentId = queue.shift();
                const currentDist = distances[currentId];

                adjacencyList[currentId].forEach(neighborId => {
                    if (distances[neighborId] === undefined) {
                        distances[neighborId] = currentDist + 1;
                        queue.push(neighborId);

                        if (distances[neighborId] >= 3) {
                            validDestinations.push(neighborId);
                        }
                    }
                });
            }
        }

        const destinationId = validDestinations[Math.floor(Math.random() * validDestinations.length)];
        const destination = stations.find(s => s.id === destinationId);
        const startedAt = Math.floor(Date.now() / 1000);

        const gameId = await createGame(req.user.id, origin.id, destination.id, startedAt);

        return responseSuccess(res, {
            game_id: gameId,
            origin,
            destination,
            started_at: startedAt
        }, "Game started");
    },

    submit: async (req, res) => {
        const { route } = req.body;
        const gameId = req.params.id;

        const game = await getGameById(gameId);

        if (!game || game.user_id !== req.user.id || game.history !== null) {
            return responseError(res, null, "Invalid request", 400);
        }

        const elapsedTime = Math.floor(Date.now() / 1000) - game.started_at;

        if (elapsedTime > 90) {
            const history = JSON.stringify([{ step: 1, description: "Time expired", effect: -20 }]);
            await updateGame(gameId, 0, history);

            const updatedGame = await getGameById(gameId);
            updatedGame.history = JSON.parse(updatedGame.history);
            return responseSuccess(res, updatedGame, "Game lost due to timeout");
        }

        if (!route || !Array.isArray(route) || route.length === 0) {
            const history = JSON.stringify([{ step: 1, description: "Empty route submitted", effect: -20 }]);
            await updateGame(gameId, 0, history);

            const updatedGame = await getGameById(gameId);
            updatedGame.history = JSON.parse(updatedGame.history);
            return responseSuccess(res, updatedGame, "Game lost due to invalid route");
        }

        const segments = await listSegments();
        const events = await listEvents();

        let finalScore = 20;
        const gameHistory = [];
        let currentStation = game.origin;
        let isFailed = false;

        for (let i = 0; i < route.length; i++) {
            const segment = segments.find(s => s.id === route[i]);

            if (!segment) {
                gameHistory.push({ step: i + 1, description: "Invalid segment selected", effect: -finalScore });
                isFailed = true;
                finalScore = 0;
                break;
            }

            let nextStation;
            if (segment.origin === currentStation) {
                nextStation = segment.destination;
            } else if (segment.destination === currentStation) {
                nextStation = segment.origin;
            } else {
                gameHistory.push({ step: i + 1, description: "Disconnected segment", effect: -finalScore });
                isFailed = true;
                finalScore = 0;
                break;
            }

            const event = events[Math.floor(Math.random() * events.length)];
            finalScore += event.effect;

            gameHistory.push({
                step: i + 1,
                segment_id: segment.id,
                event_id: event.id,
                description: event.description,
                effect: event.effect
            });

            currentStation = nextStation;
        }

        if (!isFailed && currentStation !== game.destination) {
            gameHistory.push({
                step: route.length + 1,
                description: "Failed to reach destination",
                effect: -finalScore
            });
            finalScore = 0;
        }

        await updateGame(gameId, finalScore, JSON.stringify(gameHistory));

        const updatedGame = await getGameById(gameId);
        updatedGame.history = JSON.parse(updatedGame.history);

        return responseSuccess(res, updatedGame, "Game processed");
    },
}

export default gamesController;