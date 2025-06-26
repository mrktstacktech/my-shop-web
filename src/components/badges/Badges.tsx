import './style.css'
import type { BadgeType } from './type';

export function Badges({
    notification,
    styles,
    className,
    onClick,
    children
}: BadgeType) {
    return (
        <div onClick = {onClick} className={`btn ${className}`} style={styles}>
            {typeof notification === 'number' && notification > 0 && notification < 100 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {notification}
                </span>
            )}
            {typeof notification === 'number' && notification >= 100 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                </span>
            )}
            {children}
        </div>
    );
}