import { useCallback, useEffect, useState } from "react";
import { CategoryRepository } from "../services/repositories";
import { Carousel, Image } from "../components";
import type { CategoryListEntity } from "../services/domain/entities";
import { PosterGrid } from "../components/poster-grid/poster-grid";

export function HomePage() {
    const [list, setList] = useState<CategoryListEntity>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const images = [
        <Image src="/public/mobile-image.svg" alt="Banner 1" className="absolute right-0 w-3/5 p-4" classNameBackground="relative bg-black w-full h-full object-cover">
            <div className="absolute flex flex-col left-0 pl-12 top-1/2 transform -translate-y-1/2">
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
    ]

    const fetchCategories = useCallback(() => {
        setLoading(true);
        const response = new CategoryRepository().getCategoryList();
        response.then(data => {
            setList(data);
        }).catch(error => {
            console.error("Error fetching categories:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div className="flex flex-col w-full h-full p-4">
            <div className="flex justify-between items-start w-full h-68 overscroll-contain">
                {loading
                    ? <div>Loading categories...</div>
                    : <div className="flex flex-col w-1/6 h-full overflow-y-scroll scrollbar-hide">
                        {list.map((category) => (
                            <a href="#" key={category.slug} className="hover:underline hover:text-blue-300 my-2">
                                {category.name}
                            </a>
                        ))}
                    </div>}
                <div className="w-5/6 h-full">
                    <Carousel images={images} autoSlide={false} className="h-60" showIndicators={true} />
                </div>
            </div>

            <PosterGrid /> 

            
        </div>

    );
}