import { Router } from "express";

import {prisma} from "../../../infrastructure/database/mysql/client/prisma";
import { PrismaProductRepository } from "../../../infrastructure/database/mysql/repositories/PrismaProductRepository";
import { CreateProduct } from "../../../application/product/use-cases/CreateProduct";
import { ProductController } from "../controllers/ProductController";
import { GetProducts } from "../../../application/product/use-cases/GetProducts";
import { GetProductById } from "../../../application/product/use-cases/GetProductById";
import { MongooseProductReadRepository } from "../../../infrastructure/database/mongodb/repositories/MongooseProductReadRepository";
import { InMemoryEventBus } from "../../../application/events/InMemoryEventBus";
import { ProductProjection } from "../../../application/product/projections/ProductProjection";
import { MongooseProductReadModelRepository } from "../../../infrastructure/database/mongodb/repositories/MongooseProductReadModelRepository";
import { ProductCreated } from "../../../domain/events/ProductCreated";

const router = Router();

const productReadRepository = new MongooseProductReadRepository();
const eventBus = new InMemoryEventBus();

const productRepository = new PrismaProductRepository(prisma);
const getProducts = new GetProducts(productReadRepository);
const getProductById = new GetProductById(productReadRepository);

const createProduct = new CreateProduct(
    productRepository, eventBus
);


const productController = new ProductController(
  createProduct,
  getProducts,
  getProductById
);
const productReadModelRepository =
  new MongooseProductReadModelRepository();

const productProjection = new ProductProjection(
  productReadModelRepository
);
eventBus.subscribe<ProductCreated>(
  "ProductCreated",
  (event) => productProjection.handle(event)
);

router.post("/", (req, res) =>
    productController.create(req, res)
);

router.get("/", (req, res) => productController.getAll(req, res));

router.get("/:id", (req, res) => productController.getById(req, res));

export default router;