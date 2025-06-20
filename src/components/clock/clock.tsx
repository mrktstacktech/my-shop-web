import { useCountDown } from "@hooks";
import './style.css';
export function Clock({ targetTime }: { targetTime?: Date }) {
    const {
        days,
        hours,
        minutes,
        seconds
    } = useCountDown(targetTime ?? new Date());

    return (
        <div className="clock-container">
            <div className="item flex flex-col items-center">
                <span className="text-sm">Days</span>
                <span className="text-xl font-bold">{days}</span>
            </div>
            <div className="item flex flex-col items-center">
                <span className="text-sm">Hours</span>
                <span className="text-xl font-bold">{hours}</span>
            </div>
            <div className="item flex flex-col items-center">
                <span className="text-sm">Minutes</span>
                <span className="text-xl font-bold">{minutes}</span>
            </div>
            <div className="item flex flex-col items-center">
                <span className="text-sm">Seconds</span>
                <span className="text-xl font-bold">{seconds}</span>
            </div>
        </div>
    )


}