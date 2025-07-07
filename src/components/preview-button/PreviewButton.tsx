import { useState } from "react";
import "./style.scss";

export function PreviewButton({ image, label, className }: { image: string, label: React.ReactNode, className?: string }) {
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const togglePreview = () => {
        setIsPreviewVisible(!isPreviewVisible);
    };
    return (
        <div className={`button-container ${className} ${className}__button-container`}>
            <button
                onClick={togglePreview}
            >
                {label}
            </button>
            {isPreviewVisible && (
                <div onClick={togglePreview} className={`button-container__preview`}>
                    <div className="button-container__preview__image">
                        <img src={image} alt="Preview" />
                    </div>
                </div>
            )}
        </div>
    )
}