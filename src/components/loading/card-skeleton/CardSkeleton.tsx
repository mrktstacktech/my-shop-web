import './style.scss';
export function CardSkeleton() {
    return (
        <div className="card">
            <div className="card__header">
                <img className="skeleton" alt="" />
            </div>
            <div className="card__body">
                <div className="card__body body__text" id="card-details">
                    <h2 className="skeleton skeleton-text skeleton-text__body"></h2>
                </div>
            </div>
            <div className="card__footer" id="card-footer">
                <div className="skeleton skeleton-text skeleton-footer"></div>
                <div className="skeleton skeleton-text skeleton-footer"></div>
            </div>
        </div>
    );
}