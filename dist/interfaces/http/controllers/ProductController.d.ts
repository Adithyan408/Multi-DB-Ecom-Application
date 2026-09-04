import { Request, Response } from "express";
import { CreateProduct } from "../../../application/product/use-cases/CreateProduct";
import { GetProducts } from "../../../application/product/use-cases/GetProducts";
import { GetProductById } from "../../../application/product/use-cases/GetProductById";
export declare class ProductController {
    private readonly createProduct;
    private readonly getProducts;
    private readonly getProductById;
    constructor(createProduct: CreateProduct, getProducts: GetProducts, getProductById: GetProductById);
    create(req: Request, res: Response): Promise<void>;
    getAll(_req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
}
