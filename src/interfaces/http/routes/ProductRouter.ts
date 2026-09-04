import { Router } from "express";

import {prisma} from "../../../infrastructure/database/mysql/client/prisma";
import { PrismaProductRepository } from "../../../infrastructure/database/mysql/repositories/PrismaProductRepository";
import { CreateProduct } from "../../../application/product/use-cases/createProduct";
import { ProductController } from "../controllers/ProductController";

const router = Router();

const productRepository = new PrismaProductRepository(prisma);

const createProduct = new CreateProduct(
    productRepository
);

const productController = new ProductController(
    createProduct
);

router.post("/", (req, res) =>
    productController.create(req, res)
);

export default router;