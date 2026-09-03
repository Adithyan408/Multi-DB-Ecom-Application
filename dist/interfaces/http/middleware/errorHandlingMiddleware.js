"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, _req, res, _next) => {
    console.log(err);
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorHandlingMiddleware.js.map