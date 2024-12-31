const client = require("../database/setup")
const { ObjectId } = require("mongodb")

class Prediction {
    constructor(data) {
        this.id = data.id
        this.userID = data.userID
        this.matchID = data.matchID
        this.side = data.side
        this.predicted_xG = data.predicted_xG
        this.corners = data.corners
        this.playerToScore = data.playerToScore
        this.cleanSheet = data.cleanSheet
    }

    static async getAll() {
        await client.connect()
        const response = await client.db("database").collection("predictions").find({})
        const all = await response.toArray()
        return all;
    }

    static async create({id, userID, matchID, side}) {
        try {
            await client.connect()
            // const response = await client.db("database").collection("predictions").deleteMany({})
            await client.db("database").collection("predictions").createIndex({userID: 1, matchID: 1}, {unique: true})
            const response = await client.db("database").collection("predictions").insertOne({
                _id: id,
                userID: userID,
                matchID: matchID,
                side: {
                    home: {
                        predicted_xG: side.home.predicted_xG,
                        corners: side.home.corners,
                        playerToScore: side.home.playerToScore,
                        cleanSheet: side.home.cleanSheet
                    },
                    away: {
                        predicted_xG: side.away.predicted_xG,
                        corners: side.away.corners,
                        playerToScore: side.away.playerToScore,
                        cleanSheet: side.away.cleanSheet
                    }
                }
            });
            return response;
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
