import { Request, Response } from "express";
import { CreateProduct } from "../../../application/product/use-cases/createProduct";




export class ProductController{
    constructor(private readonly createProduct: CreateProduct){}

    async create(req: Request, res: Response): Promise<void>{
        const product = await this.createProduct.execute(req.body)

        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: product 
        })
    }
}