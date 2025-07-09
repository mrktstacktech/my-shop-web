import { useShowProductImages } from "@/hooks";
import { SubImage } from "./components";
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
                    <SubImage 
                        key={index}
                        src={image}
                        size="small"
                        alt={`Product Thumbnail ${index + 1}`}
                        onClick={() => getCurrentImage(image)}
                        onMouseEnter={() => getCurrentImage(image)}
                        onMouseLeave={() => resetCurrentImage()}
                        className={`${className}__images__sub-image ${currentImage === image ? 'active' : ''}`}
                    />
                ))}
            </div>
            <div className={`${className}__main-image`}>
                <SubImage 
                    src={currentImage} 
                    alt="Product Main" 
                    className={`${className}__main-image__image`}
                    onClick={() => {}}
                    onMouseEnter={() => {}}
                    onMouseLeave={() => {}}
                />
            </div>
        </div>
    );
}
