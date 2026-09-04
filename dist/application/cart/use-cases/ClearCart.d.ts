import { Cart } from "../../../domain/entities/Cart";
import { ICartRepository } from "../../../domain/repositories/ICartRepository";
export declare class ClearCart {
    private readonly cartRepository;
    constructor(cartRepository: ICartRepository);
    execute(userId: string): Promise<Cart | null>;
}
