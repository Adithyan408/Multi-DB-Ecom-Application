"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const authRouter = (0, express_1.Router)();
const authController = new AuthController_1.AuthController();
authRouter.post("/register", (req, res, next) => {
    authController.register(req, res, next);
});
authRouter.post("/login", (req, res, next) => {
    authController.login(req, res, next);
});
authRouter.post("/refresh", (req, res) => {
    authController.refresh(req, res);
});
exports.default = authRouter;
//# sourceMappingURL=AuthRouter.js.map