import 'dotenv/config';

function makePenaltyHistory(description, step = 1, scoreBefore = parseInt(process.env.STARTING_SCORE)) {
    return [{
        step: step,
        type: "penalty",
        description: description,
        segment_id: null,
        event_id: null,
        effect: -scoreBefore,
        score_before: scoreBefore,
        score_after: 0
    }];
}

function normalizeHistoryItem(item) {
    const type = item.type ?? (item.event_id ? "event" : "penalty");

    return {
        step: item.step ?? null,
        type: type,
        description: item.description,
        segment_id: item.segment_id ?? null,
        event_id: item.event_id ?? null,
        effect: item.effect ?? 0,
        score_before: item.score_before ?? null,
        score_after: item.score_after ?? null
    };
}

function parseHistory(history) {
    if (!history) return [];

    return JSON.parse(history).map(normalizeHistoryItem);
}

function serializeHistory(history) {
    return JSON.stringify(history);
}

export { makePenaltyHistory, parseHistory, serializeHistory };
