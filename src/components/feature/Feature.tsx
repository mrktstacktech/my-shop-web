import './style.scss';
import type { FeatureProps } from './type';

export function Feature({
    title,
    description,
    image,
    className = ''
}: FeatureProps) {
    return (
        <div className={`feature-container ${className}`}>
            <div className={`feature-container__icon ${className}__icon`}>
                {image}
            </div>
            <div className={`feature-container__title ${className}__title`}>
                {title}
            </div>
            <div className={`feature-container__description ${className}__description`}>
                {description}
            </div>
        </div>
    )
}