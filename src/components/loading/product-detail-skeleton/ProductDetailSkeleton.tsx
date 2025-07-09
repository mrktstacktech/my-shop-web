import './style.scss';
export function ProductDetailSkeleton() {
    return (
        <div className="product-detail-skeleton">
            <div className="product-detail-skeleton__image"></div>
            <div className='product-detail-skeleton__content'>
                <div className="product-detail-skeleton__content__header"></div>
                <div className="product-detail-skeleton__content__rating"></div>
                <div className="product-detail-skeleton__content__price"></div>
                <div className="product-detail-skeleton__content__description"></div>
                <div className="product-detail-skeleton__content__description__line"></div>
                <div className="product-detail-skeleton__content__description__line"></div>
                <div className="product-detail-skeleton__content__description__line"></div>
            </div>
        </div>
    );
}