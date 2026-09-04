export interface CartItem {
    productId: string;
    quantity: number;
}
export declare class Cart {
    readonly id: string;
    readonly userId: string;
    readonly items: CartItem[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: string, userId: string, items: CartItem[], createdAt: Date, updatedAt: Date);
}
