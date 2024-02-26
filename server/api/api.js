import express from "express"
import db from "../db/conn.js"

const router = express.Router()

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


export default router