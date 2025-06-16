import { useState, useEffect } from 'react';
import type { CarouselType } from './type';

export const Carousel = (props: CarouselType) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (props.autoSlide) {
            const slideInterval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % props.images.length);
            }, props.autoSlideInterval);
            return () => clearInterval(slideInterval);
        }
    }, [props.autoSlide, props.autoSlideInterval, props.images.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % props.images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + props.images.length) % props.images.length);
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className={`overflow-hidden relative ${props.className || ''}`} style={props.style} onClick={props.onClick}>
                {props.images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-transform transform ${index === currentIndex ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        {image}
                    </div>
                ))}
            </div>
            {props.preButton ? (
                <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                    onClick={prevSlide}
                >
                    {props.preButton}
                </button>

            ) : null}
            {props.nextButton ? (
                <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                    onClick={nextSlide}
                >
                    {props.nextButton}
                </button>
            ) : null}
            {props.showIndicators ? (
                <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
                    {props.images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full mx-1 ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
};

