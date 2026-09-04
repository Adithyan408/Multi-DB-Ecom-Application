"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
class ProductController {
    createProduct;
    getProducts;
    getProductById;
    constructor(createProduct, getProducts, getProductById) {
        this.createProduct = createProduct;
        this.getProducts = getProducts;
        this.getProductById = getProductById;
    }
    async create(req, res) {
        const product = await this.createProduct.execute(req.body);
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    }
    async getAll(_req, res) {
        const products = await this.getProducts.execute();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products,
        });
    }
    async getById(req, res) {
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
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map