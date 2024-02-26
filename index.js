import express from "express"
import "./server/loadEnvironment.js";
import api from "./server/api/geo.js"
import bodyParser from "body-parser";
import cors from "cors"

// EXPRESS SERVER CODE
const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.static("public"))

app.use("/api/geo", api)

app.use(cors())

app.get("/", async (req, res) => {   
  res.render("index.ejs")
})

app.get("/publish", (req, res) => {
  res.render("publish.ejs")
})

app.listen(process.env.PORT, () => {})
