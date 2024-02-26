import express from "express"
import db from "../db/conn.js"
import bodyParser from "body-parser"

const router = express.Router()
router.use(bodyParser.urlencoded({extended: true}))
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
  let collection = db.collection("geoJSON")
  let newDocument = req.body

  const JSON = {
    type: "Feature",
    properties: {
      ADMIN: "",
      
    },
    geometry: {

    }
  }

  const result = await collection.insertOne(newDocument)
  
  res.send("OK").status(200)
})

export default router