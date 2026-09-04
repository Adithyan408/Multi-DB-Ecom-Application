import { Request, Response } from "express";
import { CreateProduct } from "../../../application/product/use-cases/CreateProduct";
import { GetProducts } from "../../../application/product/use-cases/GetProducts";
import { GetProductById } from "../../../application/product/use-cases/GetProductById";

export class ProductController {
  constructor(
    private readonly createProduct: CreateProduct,
    private readonly getProducts: GetProducts,
    private readonly getProductById: GetProductById,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const product = await this.createProduct.execute(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const products = await this.getProducts.execute();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  }

  async getById(req: Request, res: Response): Promise<void> {
    const productId = req.params.id;

    if (typeof productId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
      return;
    }

    const product = await this.getProductById.execute(productId);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  }
}
