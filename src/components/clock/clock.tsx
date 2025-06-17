import { useState, useEffect } from 'react';

export function Clock({targetTime} : {targetTime?: Date}) {
    const [current, setCurrent] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timeLeft = targetTime ? Math.max(0, targetTime.getTime() - current.getTime()) : 0;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
        <>
            <div className="flex justify-center items-center space-x-4">
                <div className="text-2xl font-bold">{days} Days</div>
                <div className="text-2xl font-bold">{hours} Hours</div>
                <div className="text-2xl font-bold">{minutes} Minutes</div>
                <div className="text-2xl font-bold">{seconds} Seconds</div>
            </div>
        </>
    )
    

}