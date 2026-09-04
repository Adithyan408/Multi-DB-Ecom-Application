import express from "express"
import productRouter from "./interfaces/http/routes/ProductRouter"
import { errorMiddleware } from "./interfaces/http/middleware/errorHandlingMiddleware"
import authRouter from "./interfaces/http/routes/AuthRouter"

const app = express()

app.use(express.json())


app.use("/api/auth", authRouter)
app.use("/api/", productRouter)






app.use(errorMiddleware)

export default app