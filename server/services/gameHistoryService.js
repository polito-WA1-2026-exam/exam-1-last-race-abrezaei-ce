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

function parseHistory(history) {
    if (!history) return [];

    return JSON.parse(history);
}

function serializeHistory(history) {
    return JSON.stringify(history);
}

export { makePenaltyHistory, parseHistory, serializeHistory };
