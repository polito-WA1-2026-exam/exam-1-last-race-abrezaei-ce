import { listSegments } from "../repositories/segmentRepository.js";
import { listStations } from "../repositories/stationRepository.js";
import { makePenaltyHistory } from "./gameHistoryService.js";

function buildAdjacencyList(stations, segments) {
    const adjacencyList = {};

    stations.forEach(station => adjacencyList[station.id] = []);

    segments.forEach(segment => {
        adjacencyList[segment.origin].push(segment.destination);
        adjacencyList[segment.destination].push(segment.origin);
    });

    return adjacencyList;
}

function findReachableDestinations(origin, adjacencyList) {
    const destinations = [];
    const distances = { [origin.id]: 0 };
    const queue = [origin.id];

    while (queue.length > 0) {
        const currentId = queue.shift();
        const currentDist = distances[currentId];

        adjacencyList[currentId].forEach(neighborId => {
            if (distances[neighborId] === undefined) {
                distances[neighborId] = currentDist + 1;
                queue.push(neighborId);

                if (distances[neighborId] >= 3) destinations.push(neighborId);
            }
        });
    }

    return destinations;
}

async function pickRandomOriginAndDestination() {
    const stations = await listStations();
    const segments = await listSegments();

    const adjacencyList = buildAdjacencyList(stations, segments);
    let origin;
    let destinations = [];

    while (destinations.length === 0) {
        origin = stations[Math.floor(Math.random() * stations.length)];
        destinations = findReachableDestinations(origin, adjacencyList);
    }

    const destinationId = destinations[Math.floor(Math.random() * destinations.length)];
    const destination = stations.find(station => station.id === destinationId);

    return { origin, destination };
}

function getInterchangeStationIds(segments) {
    const stationLines = new Map();

    segments.forEach(segment => {
        [segment.origin, segment.destination].forEach(stationId => {
            if (!stationLines.has(stationId)) stationLines.set(stationId, new Set());

            stationLines.get(stationId).add(segment.line_id);
        });
    });

    return new Set(
        [...stationLines.entries()]
            .filter(([stationId, lineIds]) => lineIds.size > 1)
            .map(([stationId]) => stationId)
    );
}

async function validateRoute(route, game) {
    if (!route || !Array.isArray(route) || route.length === 0) return { valid: false, history: makePenaltyHistory("Empty route submitted") };

    if (game.started_at - Math.floor(Date.now() / 1000) > 92) return { valid: false, history: makePenaltyHistory("Time has expired") };

    const segments = await listSegments();
    const interchangeStationIds = getInterchangeStationIds(segments);
    const usedSegmentIds = new Set();
    const selectedSegments = [];

    let currentStation = game.origin;
    let previousLineId = null;

    for (let i = 0; i < route.length; i++) {
        const step = i + 1;
        const segmentId = parseInt(route[i]);

        if (!Number.isInteger(segmentId)) return { valid: false, history: makePenaltyHistory("Invalid segment selected", step) };

        if (usedSegmentIds.has(segmentId)) return { valid: false, history: makePenaltyHistory("Segment selected more than once", step) };

        const segment = segments.find(segment => segment.id === segmentId);

        if (!segment) return { valid: false, history: makePenaltyHistory("Invalid segment selected", step) };

        let nextStation;
        if (segment.origin === currentStation) nextStation = segment.destination;
        else if (segment.destination === currentStation) nextStation = segment.origin;
        else return { valid: false, history: makePenaltyHistory("Disconnected segment", step) };

        if (previousLineId !== null && previousLineId !== segment.line_id && !interchangeStationIds.has(currentStation))
            return { valid: false, history: makePenaltyHistory("Line changes are allowed only at interchange stations", step) };

        usedSegmentIds.add(segmentId);
        selectedSegments.push({
            ...segment,
            user_origin: currentStation,
            user_destination: nextStation
        });

        currentStation = nextStation;
        previousLineId = segment.line_id;
    }

    if (currentStation !== game.destination) return { valid: false, history: makePenaltyHistory("Failed to reach destination", route.length + 1) };

    return { valid: true, segments: selectedSegments };
}

export { pickRandomOriginAndDestination, validateRoute };
