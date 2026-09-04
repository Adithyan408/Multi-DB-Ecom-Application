"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectMongoDB = async () => {
    await mongoose_1.default.connect(process.env["MONGODB_URL"]);
};
exports.default = connectMongoDB;
//# sourceMappingURL=mongoose.js.map