import type { TooltipType } from './type';
import { useState } from 'react';
import './style.scss';
export function Tooltip({
    content,
    position = 'top',
    className = '',
    style = {},
    children
}: TooltipType) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} className={`tooltip-container ${className}`}>
            <div className={`tooltip-container__content--${position}  ${isVisible ? `tooltip-container__content--open` : `tooltip-container__content--close`} ${className}__content`} style={style}>
                {content}
            </div>
            {children}
        </div>
    )
}