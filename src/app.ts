import express from "express"
import productRouter from "./interfaces/http/routes/ProductRouter"
import { errorMiddleware } from "./interfaces/http/middleware/errorHandlingMiddleware"

const app = express()

app.use(express.json())


app.use("/api", productRouter)






app.use(errorMiddleware)

export default app