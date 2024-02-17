const client = require("../database/setup")
const { ObjectId } = require("mongodb")

class Prediction {
    constructor(data) {
        this.id = data.id
        this.userID = data.userID
        this.matchID = data.matchID
        this.pxGHome = data.pxGHome
        this.pxGAway = data.pxGAway
    }

    static async getAll() {
        await client.connect()
        const response = await client.db("database").collection("predictions").find({})
        const all = await response.toArray()
        return all;
    }

    static async create({id, userID, matchID, pxGHome, pxGAway}) {
        try {
            await client.connect()
            // const response = await client.db("database").collection("predictions").deleteMany({})
            await client.db("database").collection("predictions").createIndex({userID: 1, matchID: 1}, {unique: true})
            const response = await client.db("database").collection("predictions").insertOne({ 
                _id: id,
                userID: userID,
                matchID: matchID,
                pxGHome: pxGHome === null ? 0.0 : pxGHome,
                pxGAway: pxGAway === null ? 0.0 : pxGAway
            })
            return response
        } catch (error) {
            return error
        }
    }

    static async getUserPredictions(uID) {
        await client.connect()
        const response = client.db("database").collection("predictions").find({userID: uID})
        const predictions = await response.toArray()
        if(predictions.length >= 1) {
            return predictions
        } else {
            return `User ${uID} has made no predictions`
        }
    }
}

module.exports = Prediction
