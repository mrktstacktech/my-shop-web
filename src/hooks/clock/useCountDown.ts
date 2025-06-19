
import { useState, useEffect } from 'react';

export function useCountDown(targetTime: Date) {
    const [current, setCurrent] = useState<Date>(new Date());
    const target = targetTime && new Date(targetTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timeLeft = targetTime ? Math.max(0, target.getTime() - current.getTime()) : 0;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return {
        days,
        hours,
        minutes,
        seconds,
        current
    }
}