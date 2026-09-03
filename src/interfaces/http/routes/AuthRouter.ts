import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRouter = Router();

const authController = new AuthController()

authRouter.post("/register", (req, res, next) => {
    authController.register(req, res, next)
})

authRouter.post("/login", (req, res, next) => {
    authController.login(req, res, next)
})

export default authRouter
