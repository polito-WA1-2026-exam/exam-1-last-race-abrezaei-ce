import { useState, useEffect } from 'react';

function useCountdown(start, limit = 90) {
    const [timeLeft, setTimeLeft] = useState(limit);

    useEffect(() => {
        if (!start) return;

        const checkTime = () => {
            const now = Math.floor(Date.now() / 1000);
            const elapsed = now - start;
            const remaining = limit - elapsed;

            setTimeLeft(remaining <= 0 ? 0 : remaining);
        };

        checkTime();

        const intervalId = setInterval(checkTime, 1000);

        return () => clearInterval(intervalId);
    }, [start, limit]);

    return timeLeft;
}

export default useCountdown;