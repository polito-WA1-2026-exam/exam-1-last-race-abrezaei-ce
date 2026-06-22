import { listEvents } from "../repositories/eventRepository.js";
import { createGame, finishActiveGamesByUserId, getGameByIdAndUserId, getGamesByUserId, updateGame } from "../repositories/gameRepository.js";
import { listSegments } from "../repositories/segmentRepository.js";
import { listStations } from "../repositories/stationRepository.js";
import { makePenaltyHistory, parseHistory, serializeHistory } from "./gameHistoryService.js";
import { pickRandomOriginAndDestination, validateRoute } from "./routeService.js";

function executeRoute(segments, events, isPredefined = false) {
    let score = parseInt(process.env.STARTING_SCORE);

    const history = segments.map((segment, index) => {
        const event = isPredefined ? events.find(event => event.id === segment.event_id) : events[Math.floor(Math.random() * events.length)];
        const scoreBefore = score;

        score += event.effect;

        return {
            step: index + 1,
            type: "event",
            description: event.description,
            segment_id: segment.id,
            event_id: event.id,
            effect: event.effect,
            score_before: scoreBefore,
            score_after: score,
            user_origin: segment.user_origin,
            user_destination: segment.user_destination
        };
    });

    return {
        history,
        score: Math.max(score, 0)
    };
}

async function getGamesForUser(gameId, userId) {
    return await getGamesByUserId(gameId, userId);
}

async function getGameForUser(gameId, userId) {
    const game = await getGameByIdAndUserId(gameId, userId);

    if (!game) return null;

    return {
        ...game,
        history: parseHistory(game.history)
    };
}

async function abandonActiveGames(userId) {
    const history = serializeHistory(makePenaltyHistory("Abandoned game"));

    await finishActiveGamesByUserId(userId, 0, history);
}

async function startGame(userId) {
    await abandonActiveGames(userId);

    const { origin, destination } = await pickRandomOriginAndDestination();

    const startedAt = Math.floor(Date.now() / 1000);
    const gameId = await createGame(userId, origin.id, destination.id, startedAt);

    return {
        game_id: gameId,
        origin,
        destination,
        started_at: startedAt
    };
}

async function submitRoute(gameId, userId, route) {
    const game = await getGameByIdAndUserId(gameId, userId);

    if (!game || game.history !== null) return null;

    const validation = await validateRoute(route, game);

    if (!validation.valid) {
        await updateGame(gameId, 0, serializeHistory(validation.history));

        return { game: await getGameForUser(gameId, userId), message: validation.history[0].description };
    }

    const events = await listEvents();
    const result = executeRoute(validation.segments, events);

    await updateGame(gameId, result.score, serializeHistory(result.history));

    return { game: await getGameForUser(gameId, userId), message: "Game processed" };
}

export { getGamesForUser, getGameForUser, abandonActiveGames, startGame, submitRoute, executeRoute };
