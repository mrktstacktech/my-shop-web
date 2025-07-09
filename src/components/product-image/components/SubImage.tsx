import { useState } from 'react';
import { Spinner } from '@/components';
import type { SubImageType } from './type';

export function SubImage(
    {
        src,
        alt,
        className = 'sub-image',
        size = 'medium',
        style = {},
        onClick,
        onMouseEnter,
        onMouseLeave
    }: SubImageType
) {
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <div className={`${className}`} style={style}>
            {loading && (
                <Spinner size={size} color="secondary" />
            )}
            <img
                src={src}
                alt={alt}
                className={`${className}__image`}
                style={{ display: loading ? 'none' : 'block' }}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        </div>
    )
}