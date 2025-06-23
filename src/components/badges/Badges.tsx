import './style.css'
import type { BadgeType } from './type';

export function Badges({
    title,
    notification,
    styles,
    className,
    href = '#'
}: BadgeType) {
    return (
        <a href={href} className={`btn + ${className}`} style={styles}>
            {title}
            {notification > 0 && notification < 100 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {notification}
                </span>) ||
                notification >= 100 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        99+
                    </span>
                )
            }
        </a>
    );
}