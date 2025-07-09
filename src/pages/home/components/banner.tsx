import { useMemo } from "react";
import { Image, Carousel, Spinner } from "@components";
import { useGetCategories } from "@hooks";

export function Banner() {
    const { data: list, loading } = useGetCategories();

    const images = useMemo(() => [
        <Image
            src="/public/mobile-image.svg"
            alt="Banner 1"
            className="banner__image"
            classNameBackground="banner__background"
        >
            <div className="banner__content">
                <img src="/public/apple-logo.svg" className="banner__logo" />
                <p className="banner__text">Up to 10% off Voucher</p>
                <a
                    href="#"
                    onClick={() => console.log("Buy now button clicked")}
                    className="banner__link"
                >
                    Shop Now
                </a>
            </div>
        </Image>,

        <Image
            src="/public/mobile-image.svg"
            alt="Banner 2"
            className="banner__image"
            classNameBackground="banner__background"
        >
            <div className="banner__content">
                <img src="/public/apple-logo.svg" className="banner__logo" />
                <p className="banner__text">Up to 10% off Voucher</p>
                <a
                    href="#"
                    onClick={() => console.log("Buy now button clicked")}
                    className="banner__link"
                >
                    Shop Now
                </a>
            </div>
        </Image>,

        <Image
            src="/public/mobile-image.svg"
            alt="Banner 3"
            className="banner__image"
            classNameBackground="banner__background"
        >
            <div className="banner__content">
                <img src="/public/apple-logo.svg" className="banner__logo" />
                <p className="banner__text">Up to 10% off Voucher</p>
                <a
                    href="#"
                    onClick={() => console.log("Buy now button clicked")}
                    className="banner__link"
                >
                    Shop Now
                </a>
            </div>
        </Image>
    ], []);

    return (
        <div className="banner">
            {loading ? (
                <div className="banner__categories"><Spinner /></div>
            ) : (
                <div className="banner__categories">
                    {list.map((category) => (
                        <a
                            href="#"
                            key={category.slug}
                            className="banner__categories__category"
                        >
                            {category.name}
                        </a>
                    ))}
                </div>
            )}
            <div className="banner__carousel">
                <Carousel images={images} autoSlide={false} className="banner__carousel-inner" showIndicators={true} />
            </div>
        </div>
    );
}
