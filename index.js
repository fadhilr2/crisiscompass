import express from "express"
import "./server/loadEnvironment.js";
import api from "./server/api/geo.js"
import db from "./server/db/conn.js";
// EXPRESS SERVER CODE
const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.static("public"))
app.use("/api/geo", api)

const articles = db.collection("articles")

app.get("/", async (req, res) => {   
  res.render("index.ejs")
})
app.get('/article/:id', function(req, res) {
  res.render('article.ejs');
  // return titles.findOne({ id: req.params.id }, function (err, post) {
  //   if (err) { throw(err); }

  //   return 
  // });
});
app.get("/publish/geo", (req, res) => {
  res.render("publish/geo.ejs")
})
app.get("/publish/article", (req, res) => {
  res.render("partials/article.ejs")
})




app.listen(process.env.PORT, () => {})
