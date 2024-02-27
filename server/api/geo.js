import express from "express"
import db from "../db/conn.js"
import bodyParser from "body-parser"
import jsonminify from "jsonminify"

const router = express.Router()
router.use(bodyParser.urlencoded({extended: true, limit: "10000000mb"}))
router.use(bodyParser.json())
router.get("/", async (req, res) => {
  let collection = db.collection("geoJSON")
  const findResult = collection.find({})

  const result = {
    type: "FeatureCollection",
    features: [

    ]
  }

  for await (const doc of findResult) {
    result.features.push(doc)
  }

  res.send(result).status(200)
})

router.post("/", async (req, res) => {
  let doc = req.body
  const collection = db.collection("geoJSON")
  const article = db.collection("articles")
  const countryPolygon = JSON.parse(req.body.JSONInput)
  doc = {
    _id: "",
    type: "Feature",
    properties: {
      title: req.body.title,
      deaths: req.body.deaths,
      status: Number(req.body.status),
      state: Number(req.body.state),
      thumb: req.body.thumb,
      JSON: req.body.JSONInput
    },
    geometry: countryPolygon 
  }

  const articleData = {
    title: "Sudan Civil War",
    author: "wada",
    publishedDate: "2024",
    content: [
      
    ]
  }
  const result = await collection.insertOne(doc)
  const articleResult = await article.insertOne(articleData)
  res.send(doc).status(200)
})

export default router