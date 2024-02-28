import express from "express"
import "./server/loadEnvironment.js";
import api from "./server/api/geo.js"
import articleAPI from "./server/api/article.js"
import db from "./server/db/conn.js";
// EXPRESS SERVER CODE
const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.static("public"))
app.use("/api/geo", api)
app.use("/api/article", articleAPI)

const articles = db.collection("articles")

app.get("/", async (req, res) => {   
  res.render("index.ejs")
})
app.get('/article/:id', async function(req, res) {
  const data = await (await fetch(`http://localhost:3000/api/article?id=${req.params.id}`)).json()  
  res.render("article.ejs", {
    title: data.title,
    description: data.description,
    author: data.author,
    thumb: data.thumb,
    content: data.content
  })
});
app.get("/publish/geo", (req, res) => {
  res.render("publish/geo.ejs")
})




app.listen(process.env.PORT, () => {})
