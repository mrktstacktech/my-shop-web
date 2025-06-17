const UN_FILL_STAR_SRC = '/public/unfilled-star.svg';

export function StarRating({ rating, reviewNumber }: { rating: number, reviewNumber?: number }) {
    const stars = Array.from({ length: 5 }, (_, index) => {
        const starRating = index + 1;

        let imgSrc = UN_FILL_STAR_SRC;
        let altText = 'Star empty';

        if (starRating <= rating) {
            imgSrc = '/public/filled.svg';
            altText = 'Star filled';
        } else if (starRating - 0.5 <= rating) {
            imgSrc = '/public/star-half-filled.svg'; // You need this asset
            altText = 'Star half filled';
        }

        return <img src={imgSrc} alt={altText} key={index} className="w-4" />;
    });

    return <div className="star-rating flex mt-1">{stars} <span className="text-gray-500 ml-2 text-sm">({reviewNumber})</span></div>;
}
