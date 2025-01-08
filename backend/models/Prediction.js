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
    
    static async update({userID, matchID, side}) {
        /* Yaaaaay! I got it working, so NOW lets break down what we did, so we DON'T forget this!!!
        So since side (from frontend) comes as an object, we need to access the actual "side" name (home/away) and since that's a key, we can use Object.keys to access that
        we then use updateOne (because we want to edit a PART of the data) we then filter (the first part of update within the { } ) by userID and matchID
        I then tell the update what to add in, after filtering, here we are checking side (the object) and the "key" (home or away) and we're setting this as which part
        of the data is getting updated. We then update the elements within that object, predicted_XG, corners etc;*/
        const side_name = Object.keys(side)
        try {
            await client.connect()
            const response = await client.db("database").collection("predictions").updateOne(
                {
                    userID: userID,
                    matchID: matchID
                },
                {
                    $set: {
                        [`side.${side_name}`]: {
                            predicted_xG: parseFloat(side[side_name].predicted_xG),
                            corners: side[side_name].corners,
                            playerToScore: side[side_name].playerToScore,
                            cleanSheet: side[side_name].cleanSheet
                        }
                    }
                }
            );
        return response;
        } catch (error) {

        }
    }

    static async getAllUserPredictions(uID) {
        await client.connect()
        const response = client.db("database").collection("predictions").find({userID: uID})
        const predictions = await response.toArray()
        if(predictions.length >= 1) {
            return predictions
        } else {
            return `User ${uID} has made no predictions`
        }
    }

    static async getAllUserMatchPredictions(uID, mID) {
        await client.connect()
        const response = client.db("database").collection("predictions").find({userID: uID, matchID: mID})
        const predictions = await response.toArray()
        if(predictions.length >= 1) {
            return predictions
        } else {
            return []
        }
    }
}

module.exports = Prediction
