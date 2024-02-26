import { MongoClient, ServerApiVersion } from "mongodb"

const uri = process.env.ATLAS_URI || "";


const client = new MongoClient(uri,  {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
}
);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}
let db = conn.db("geoDB");

export default db;