import express from "express"
import uniqid from 'uniqid'


// EXPRESS SERVER CODE
const app = express()
const port = 3000

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.listen(port, () => {})