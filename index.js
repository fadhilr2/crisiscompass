import express from "express"
import "./server/loadEnvironment.js";
import api from "./server/api/api.js"

// EXPRESS SERVER CODE
const app = express()

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use("/api", api)

app.get("/", async (req, res) => {   
  res.render("index.ejs")
})

app.listen(process.env.PORT, () => {})