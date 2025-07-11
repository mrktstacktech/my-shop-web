import { useCountDown } from "@/hooks";
import { Image } from "@components"
import './style.scss';
export function Poster() {
    const {
        days,
        hours,
        minutes,
        seconds
    } = useCountDown(new Date("2026-01-01"));

    return (
        <div className="w-[100%] h-[400px] flex items-center justify-center relative p-10 poster">
            <Image
                src="/public/poster.svg"
                alt="Banner 1"
                className="absolute right-0 w-[50%] h-full object-cover"
                classNameBackground="relative w-full h-full"
            >
                <div className="flex flex-col justify-between gap-2.5
                 absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                    <div className="text-green-500 ">Categories</div>
                    <p className="text-2xl poster__text">Enhance Your Music Experience</p>

                    <div className="flex flex-row items-center mt-2 mb-4">
                        <div className="flex flex-col items-center justify-center bg-white text-black w-15 h-15 mr-4 rounded-full">
                            <span className="text-sm font-bold">{days}</span>
                            <span className="text-xs">Days</span>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-white text-black w-15 h-15 mr-4 rounded-full">
                            <span className="text-sm font-bold">{hours}</span>
                            <span className="text-xs">Hours</span>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-white text-black w-15 h-15 mr-4 rounded-full">
                            <span className="text-sm font-bold">{minutes}</span>
                            <span className="text-xs">Minutes</span>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-white text-black w-15 h-15 mr-4 rounded-full">
                            <span className="text-sm font-bold">{seconds}</span>
                            <span className="text-xs">Seconds</span>
                        </div>
                    </div>
                    <a
                        href="#"
                        onClick={() => console.log("Buy now button clicked")}
                        className="bg-green-500 w-[20%] text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                        Buy now!
                    </a>
                </div>
            </Image>
        </div>


    );
}