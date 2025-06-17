import { useMemo } from "react";
import './components/style.css';
import { Clock } from "../../components";
import { ProductList, FlashSaleProduct, Banner, BestSeller, PosterGrid } from "./components";

export function HomePage() {
    const ProductListComponent = useMemo(() => ProductList, []);
    const FlashSaleComponent = useMemo(() => FlashSaleProduct, []);
    return (
        <div className="flex flex-col w-full h-full p-4">

            <Banner />
            <FlashSaleComponent />
            <BestSeller />
            <ProductListComponent />
            <PosterGrid />
            <Clock targetTime={new Date("2025-06-10")} />

        </div>

    );
}