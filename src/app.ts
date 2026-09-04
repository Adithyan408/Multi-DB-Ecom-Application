import express from "express"
import productRouter from "./interfaces/http/routes/ProductRouter"
import { errorMiddleware } from "./interfaces/http/middleware/errorHandlingMiddleware"
import authRouter from "./interfaces/http/routes/AuthRouter";
import cartRouter from "./interfaces/http/routes/CartRouter";

const app = express()

app.use(express.json())


app.use("/api/auth", authRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)






app.use(errorMiddleware)

export default app