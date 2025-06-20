import { useMemo } from "react";
import { Image, Carousel } from "@components";
import { useGetCategories } from "@hooks";

export function Banner() {
    const { data: list, loading } = useGetCategories();

    const images = useMemo(() => [
        <Image src="/public/mobile-image.svg" alt="Banner 1" className="absolute right-0 w-1/2 p-4 min-w-300[px]" classNameBackground="relative bg-black w-full h-full object-cover">
            <div className="absolute flex flex-col left-0 pl-15 top-1/2 transform -translate-y-1/2">
                <img src="/public/apple-logo.svg" className="w-40" />
                <p className="font-bold text-white text-4xl mt-4 w-3/5">
                    Up to 10% off Voucher
                </p>
                <a href="#" onClick={() => { console.log("Buy now button clicked") }} className="text-white underline underline-offset-8 mt-4 hover:font-bold">
                    Shop Now
                </a>
            </div>
        </Image>,
        <Image src="/public/mobile-image.svg" alt="Banner 1" className="absolute right-0 w-3/5 p-4" classNameBackground="relative bg-black w-full h-full object-cover">
            <div className="absolute flex flex-col left-0 pl-12 top-1/2 transform -translate-y-1/2">
                <img src="/public/apple-logo.svg" className="w-40" />
                <p className="font-bold text-white text-4xl mt-4 w-3/5">
                    Up to 10% off Voucher
                </p>
                <a href="#" onClick={() => { console.log("Buy now button clicked") }} className="text-white underline mt-4">
                    Shop Now
                </a>
            </div>
        </Image>,
        <Image src="/public/mobile-image.svg" alt="Banner 1" className="absolute right-0 w-3/5 p-4" classNameBackground="relative bg-black w-full h-full object-cover">
            <div className="absolute flex flex-col left-0 pl-12 top-1/2 transform -translate-y-1/2">
                <img src="/public/apple-logo.svg" className="w-40" />
                <p className="font-bold text-white text-4xl mt-4 w-3/5">
                    Up to 10% off Voucher
                </p>
                <a href="#" onClick={() => { console.log("Buy now button clicked") }} className="text-white underline mt-4">
                    Shop Now
                </a>
            </div>
        </Image>,
    ], []);

    return (
        <div className="component-container flex justify-between items-start w-full h-68 overscroll-contain mb-3">
            {loading
                ? <div>Loading categories...</div>
                : <div className="category-container flex flex-col h-full overflow-y-scroll scrollbar-hide">
                    {list.map((category) => (
                        <a href="#" key={category.slug} className="text-ellipsis line-clamp-1 category-name hover:underline hover:text-blue-300 my-2">
                            {category.name}
                        </a>
                    ))}
                </div>}
            <div className="w-5/6 h-full">
                <Carousel images={images} autoSlide={false} className="h-60" showIndicators={true} />
            </div>
        </div>
    );
}