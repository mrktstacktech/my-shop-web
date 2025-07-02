import { useState, useCallback } from 'react';

export function useShowProductImages(image: string) {
    const [currentImage, setCurrentImage] = useState<string>(image);

    const getCurrentImage = useCallback((newImage: string) => {
        setCurrentImage(newImage);
    }, []);

    const resetCurrentImage = useCallback(() => {
        setCurrentImage(image);
    }, [image]);

    return {
        currentImage,
        getCurrentImage,
        resetCurrentImage
    }
}