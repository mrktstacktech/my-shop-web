import { useMemo } from "react";
// import './components/style.css';
import './components/style.scss';
import { ProductList, FlashSaleProduct, Banner, BestSeller, CategoryGrid, PosterGrid, FeatureGrid } from "./components";
export function HomePage() {
    const ProductListComponent = useMemo(() => ProductList, []);
    const FlashSaleComponent = useMemo(() => FlashSaleProduct, []);
    return (
        <div className="flex flex-col w-full h-full p-4">

            <Banner />
            <FlashSaleComponent />
            <CategoryGrid />
            <BestSeller />
            <ProductListComponent />
            <PosterGrid />
            <FeatureGrid />
            
        </div>

    );
}