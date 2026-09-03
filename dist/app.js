"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductRouter_1 = __importDefault(require("./interfaces/http/routes/ProductRouter"));
const errorHandlingMiddleware_1 = require("./interfaces/http/middleware/errorHandlingMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", ProductRouter_1.default);
app.use(errorHandlingMiddleware_1.errorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map