import express from "express"
import db from "../db/conn.js"
import bodyParser from "body-parser"
import jsonminify from "jsonminify"
import uniqid from "uniqid"

const router = express.Router()
router.use(bodyParser.urlencoded({extended: true, limit: "1000mb"}))
router.use(bodyParser.json())

const countriesByContinent = {
  "Africa": [
    "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroon",
    "Central African Republic", "Chad", "Comoros", "Democratic Republic of the Congo", "Djibouti",
    "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana",
    "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar",
    "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria",
    "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa",
    "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
  ],
  "Asia": [
    "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia",
    "China", "Cyprus", "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan",
    "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Myanmar",
    "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", "Philippines", "Qatar", "Saudi Arabia",
    "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste",
    "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
  ],
  "Europe": [
    "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia",
    "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
    "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova",
    "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania",
    "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine",
    "United Kingdom", "Vatican City"
  ],
  "NorthAmerica": [
    "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Canada", "Costa Rica", "Cuba", "Dominica",
    "Dominican Republic", "El Salvador", "Grenada", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico",
    "Nicaragua", "Panama", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Trinidad and Tobago", "United States"
  ],
  "Oceania": [
    "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Zealand", "Palau",
    "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"
  ],
  "SouthAmerica": [
    "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay", "Peru", "Suriname",
    "Uruguay", "Venezuela"
  ]
};


router.get("/", async (req, res) => {
  let collection = db.collection("geoJSON")
  const findResult = collection.find({})

  const result = {
    type: "FeatureCollection",
    features: []
  }

  for await (const doc of findResult) {
    result.features.push(doc)
  }
  res.send(result).status(200)
})




router.post("/", async (req, res) => {
  const id = uniqid()
  let doc = req.body
  const geoCollection = db.collection("geoJSON")
  const articleCollection = db.collection("articles")
  const countryPolygon = JSON.parse(JSON.minify(req.body.JSONInput))

  //* set country continent for sidebar
  let countryContinent
  for (const [key, value] of Object.entries(countriesByContinent)) {
    if(value.includes(req.body.country)){
      countryContinent = key
      break;
    }
  }

  //* geo formdata
  doc = {
    type: "Feature",
    properties: {
      title: req.body.title,
      deaths: req.body.deaths,
      status: Number(req.body.status),
      state: Number(req.body.state),
      thumb: req.body.thumb,
      articleId: id,
      continent: countryContinent
    },
    geometry: countryPolygon 
  }

  //* article form data
  const articleData = {
    _id: id,
    title: req.body.articleTitle,
    author: req.body.articleAuthor,
    content: []
  }

  //* get all section value
  let section = []
  for(const [key, value] of Object.entries(req.body)){
    if(key.includes("sectionText")){
      section.push(value)
    }
  }

  //* if sectiontext index is uneven number push object to article data content with its 
  //* title retrieved by subtracting index 1 both titles and text are retrieved from section  
  for(const [key, value] of Object.entries(req.body)){

    if(key.includes("sectionText")){
      let str = key
      let matches = parseInt(str)
      if(matches % 2)
      {
        articleData.content.push({
          title: section[matches-1],
          text: value
        })
      }
    }
  }

  const geo = await geoCollection.insertOne(doc)
  const article = await articleCollection.insertOne(articleData, {forceServerObjectId: false})

  res.send("OK").status(200)
})

export default router