import { Cart } from "../../../domain/entities/Cart";
import { ICartRepository } from "../../../domain/repositories/ICartRepository";
interface AddProductToCartInput {
    userId: string;
    productId: string;
    quantity: number;
}
export declare class AddProductToCart {
    private readonly cartRepository;
    constructor(cartRepository: ICartRepository);
    execute(input: AddProductToCartInput): Promise<Cart>;
}
export {};
