import express from "express"
import dotenv from "dotenv"
import studentRouter from "./routes/student_routes.js"
github.com/DipakShrestha-ADS/student_record.git
dotenv.config()
let app = express()
app.use(express.json())

app.use("/student", studentRouter)

let PORT = process.env.PORT || 8888
app.get("/", (req,res)=>{
    res.json({
        message: "server initial routes called successfully"
    })
})
app.listen(PORT, ()=>{
    console.log("server started at "+ PORT)
})
