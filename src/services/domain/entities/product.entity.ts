type ReviewEntity = {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
    reviewerEmail: string;
};
export interface ProductEntity {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: ReviewEntity[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    thumbnails: string;
    images: string[];
};

export type ProductPagination = {
    total: number;
    skip: number;
    limit: number;
}

export type ProductListEntity = ProductEntity[];