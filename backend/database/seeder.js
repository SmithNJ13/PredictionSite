const client = require("./setup")

const seedDB = async () => {
    try{
        await client.connect()
        console.log("Awaiting seed...")
        await client.db("statistics").collection("stats").drop()
        await client.db("statistics").collection("stats").insertOne({
            team: "Arsenal",
            xG: 0.5,
            xGA: 0.3
        })
        console.log("DB seeded!")
        await client.close()
    } catch(error) {
        console.log(error)
    }
}
seedDB()
