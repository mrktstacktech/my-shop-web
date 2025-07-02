import { useShowProductImages } from "@/hooks";
export function ProductImage({
    images,
    className = 'product-image'
} : {
    images: string[];
    className?: string;
}) {
    const { currentImage, getCurrentImage, resetCurrentImage } = useShowProductImages(images[0]);

    return (
        <div className={`${className}`}>
            <div className={`${className}__images`}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Product Thumbnail ${index + 1}`}
                        onClick={() => getCurrentImage(image)}
                        className={currentImage === image ? 'active' : ''}
                        onMouseEnter={() => getCurrentImage(image)}
                        onMouseLeave={() => resetCurrentImage()}
                    />
                ))}
            </div>
            <div className={`${className}__main-image`}>
                <img src={currentImage} alt="Product Main" />
            </div>
        </div>
    );
}
