require("dotenv").config()
const {MongoClient, ServerApiVersion} = require("mongodb")

const url = process.env.DB_URL
console.log(url)

const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const connectDB = async () => {
    try{
        await client.connect()
        await client.db("admin").command({ping: 1})
        console.log("connection successful")
    } catch(error) {
        console.log("connection unsuccessful: ", error)
    }
}
connectDB()
module.exports = client
