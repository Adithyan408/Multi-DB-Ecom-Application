import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT
app.use(express.json())

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success:true, 
        message:"API is running"
    })
})

app.listen(PORT || 3001, () => {
    console.log(`App is running is ${PORT}`)
})