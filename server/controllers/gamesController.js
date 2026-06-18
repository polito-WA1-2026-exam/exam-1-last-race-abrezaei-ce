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

    // todo: check minimum segments >= 3
    start: async (req, res) => {
        const activeGame = await getActiveGameByUserId(req.user.id);

        if (activeGame) return responseError(res, null, "You have a game already in progress", 400);

        const stations = await listStations();

        let originIndex = Math.floor(Math.random() * stations.length);
        let destinationIndex = Math.floor(Math.random() * stations.length);

        while (originIndex === destinationIndex) {
            destinationIndex = Math.floor(Math.random() * stations.length);
        }

        const origin = stations[originIndex];
        const destination = stations[destinationIndex];
        const startedAt = Date.now() / 1000;

        const gameId = await createGame(req.user.id, origin.id, destination.id, startedAt);

        return responseSuccess(res, {
            game_id: gameId,
            origin,
            destination,
            started_at: startedAt
        }, "Game started");
    },

    // todo: add constraints
    submit: async (req, res) => {
        const { route } = req.body;

        const game = await getGameById(req.params.id);

        if (!game || game.user_id !== req.user.id || game.history !== null) return responseError(res, null, "Invalid request", 400);

        const elapsedTime = (Date.now() - game.started_at) / 1000;

        if (elapsedTime > 90) {
            const history = JSON.stringify([{ step: 1, description: "Time expired", effect: -20 }]);

            await updateGame(req.params.id, 0, history);

            return responseError(res, null, "Time expired", 400);
        }

        if (!route || !Array.isArray(route) || route[0] !== game.origin) return responseError(res, null, "Invalid route", 400);

        const segments = await listSegments();
        const events = await listEvents();

        let finalScore = 20;
        const gameHistory = [];

        for (let i = 0; i < route.length - 1; i++) {
            const current = route[i];
            const next = route[i + 1];

            const segment = segments.find(s =>
                (s.origin === current && s.destination === next) ||
                (s.origin === next && s.destination === current)
            );

            if (!segment) return responseError(res, null, "Invalid move", 400);

            const event = events[Math.floor(Math.random() * events.length)];

            finalScore += event.effect;

            gameHistory.push({
                step: i + 1,
                segment_id: segment.id,
                event_id: event.id,
                description: event.description,
                effect: event.effect
            });
        }

        const isCompleted = route[route.length - 1] === game.destination;

        if (!isCompleted) {
            gameHistory.push({
                step: route.length,
                segment_id: null,
                event_id: null,
                description: "Failed to reach destination",
                effect: 0
            });
        }

        const temp = await updateGame(req.params.id, finalScore, JSON.stringify(gameHistory));

        return responseSuccess(res, temp, "Game processed");
    },
}

export default gamesController;