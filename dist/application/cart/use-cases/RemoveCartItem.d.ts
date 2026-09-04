import { Cart } from "../../../domain/entities/Cart";
import { ICartRepository } from "../../../domain/repositories/ICartRepository";
interface RemoveCartItemInput {
    userId: string;
    productId: string;
}
export declare class RemoveCartItem {
    private readonly cartRepository;
    constructor(cartRepository: ICartRepository);
    execute(input: RemoveCartItemInput): Promise<Cart | null>;
}
export {};
