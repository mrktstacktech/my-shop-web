import { Image } from "../../../components"

export function PosterGrid() {
    return (
        <div className="component-container">
            <div className="subtitle-container">
                <div className="red-block"></div>
                <div className="subtitle">Featured</div>
            </div>
            <div className="title-container">
                <div className="title">New Arrivals</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Image src="/public/ps5.svg" alt="PS5" className="w-full object-cover" classNameBackground="relative items-end  bg-black w-full h-full object-cover rounded-sm">
                    <div className="absolute flex flex-col bottom-0 pl-5 left-0 transform  -translate-y-1/3">
                        <p className="font-bold text-white text-xl mt-4 w-4/5">Play Station 5</p>
                        <p className=" text-white text-sm">
                            Black and White version of the PS5 coming out on sale.
                        </p>
                        <a href="#" onClick={() => { console.log("Buy now button clicked") }} className="text-white underline underline-offset-8 mt-2 hover:font-bold">
                            Shop Now
                        </a>
                    </div>
                </Image>
                <div className="grid grid-row-2 gap-4">
                    <Image src="/public/woman.svg" alt="iPhone 14 Pro" className="w-full object-cover rounded-sm" classNameBackground="relative bg-black w-full h-full object-cover rounded-sm">
                        <div className="absolute flex flex-col bottom-0 left-0 pl-5 transform -translate-y-1/3">
                            <p className="font-bold text-white text-xl mt-4 w-4/5">Women's Collections</p>
                            <p className=" text-white text-sm">
                                Featured woman collections that give you another vibe.
                            </p>
                            <a href="#" onClick={() => { console.log("Buy now button clicked") }} className="text-white underline underline-offset-8 mt-2 hover:font-bold">
                                Shop Now
                            </a>
                        </div>
                    </Image>
                    <div className="grid grid-cols-2 gap-4">
                        <Image src="/public/speaker.svg" alt="PS5" className="w-full object-cover" classNameBackground="relative bg-black w-full h-full object-cover p-10 rounded-sm">
                            <div className="absolute flex flex-col bottom-0 left-0 pl-5 transform -translate-y-1/3">
                                <p className="font-bold text-white text-xl mt-4 w-4/5">Speaker</p>
                                <p className=" text-white text-sm">
                                    Amazon wireless speakers
                                </p>
                                <a href="#" onClick={() => { console.log("Buy now button clicked") }} className="text-white underline underline-offset-8 mt-2 hover:font-bold">
                                    Shop Now
                                </a>
                            </div>
                        </Image>
                        <Image src="/public/perfume.svg" alt="PS5" className="w-2/3 object-cover" classNameBackground="relative bg-black w-full h-full object-cover rounded-sm">
                            <div className="absolute flex flex-col bottom-0 left-0 pl-5 transform -translate-y-1/3">
                                <p className="font-bold text-white text-xl mt-4 w-4/5">Perfume</p>
                                <p className=" text-white text-sm">
                                    GUCCI INTENSE OUD EDP
                                </p>
                                <a href="#" onClick={() => { console.log("Buy now button clicked") }} className="text-white underline underline-offset-8 mt-2 hover:font-bold">
                                    Shop Now
                                </a>
                            </div>
                        </Image>
                    </div>
                </div>
            </div>
        </div>
    )
}