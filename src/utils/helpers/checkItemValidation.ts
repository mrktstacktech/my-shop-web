import { ProductRepository } from "@services/repositories/productRepository.impl";

export function checkValidationItem() {
    const isValid = async (productId: string) => {
        try {
            const productRepo = new ProductRepository();
            const product = await productRepo.getProductById(productId);
            if (product && product.stock > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            return false;
        } 
    };

    return { isValid };
}