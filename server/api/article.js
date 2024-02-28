import express from "express"
import db from "../db/conn.js"
import bodyParser from "body-parser"
import jsonminify from "jsonminify"
import uniqid from "uniqid"

const router = express.Router()
router.use(bodyParser.urlencoded({extended: true}))

const articleColl = db.collection("articles")

router.get("/", async (req, res) => {
  const data = await articleColl.findOne({_id: req.query.id})
  res.send(data).status(200)
})

export default router