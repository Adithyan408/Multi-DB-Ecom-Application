import { Router } from "express";
import { getProduct } from "../controllers/ProductController";

const router = Router()

router.get("/", getProduct)

export default router