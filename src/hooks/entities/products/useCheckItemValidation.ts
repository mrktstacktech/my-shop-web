import { ProductRepository } from "@services/repositories/productRepository.impl";

// TODO: this is function
export function useCheckValidationItem() {
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