const client = require("../database/setup")
const { ObjectId } = require("mongodb")

class Prediction {
    constructor(data) {
        this.id = data.id
        this.userID = data.userID
        this.matchID = data.matchID
        this.pxG = data.pxG
        this.pxGA = data.pxGA
    }

    static async getAll() {
        await client.connect()
        const response = await client.db("database").collection("predictions").find({})
        const all = await response.toArray()
        return all;
    }

    static async create({id, userID, matchID, pxG, pxGA}) {
        try {
            await client.connect()
            // const response = await client.db("database").collection("predictions").deleteMany({})
            const response = await client.db("database").collection("predictions").insertOne({
                _id: id,
                userID: userID,
                matchID: matchID,
                pxG: pxG,
                pxGA: pxGA
            })
            return response
        } catch (error) {
            return error
        }
    }
}

module.exports = Prediction
