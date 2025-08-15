const client = require("../database/setup")
const { ObjectId } = require("mongodb")

class Prediction {
    constructor(data) {
        this.id = data.id
        this.userID = data.userID
        this.matchID = data.matchID
        this.season = data.season
        this.netXG = data.netXG
        this.side = data.side
        this.predicted_xG = data.predicted_xG
        this.corners = data.corners
        this.cleanSheet = data.cleanSheet
    }

    static async getAll() {
        await client.connect()
        const response = await client.db("database").collection("predictions").find({})
        const all = await response.toArray()
        return all;
    }
    
    static async check(uid, mid) {
        const id = new ObjectId(uid)
        try{
            await client.connect()
            const response = client.db("database").collection("predictions").findOne({
                userID: id,
                matchID: parseInt(mid)
            })
            return response
        } catch (error) {
            throw error
        }
    }

    static async create({userID, matchID, season, side}) {
        const uid = new ObjectId(userID)
        try {
            await client.connect()
            async function calculateNetXG() {
                const matched_Entry = await client.db("database").collection("matches").findOne({
                _id: matchID
            })
            if(matched_Entry) {
                if(matched_Entry.homeXG !== null || matched_Entry.awayXG !== null) {
                    const homeDiff = side.home.predicted_xG === undefined || side.home.predicted_xG === null ? 0 : -Math.abs(side.home.predicted_xG - matched_Entry.homeXG) 
                    const awayDiff = side.away.predicted_xG === undefined || side.away.predicted_xG === null ? 0 : -Math.abs(side.away.predicted_xG - matched_Entry.awayXG)
                    const netValue = homeDiff + awayDiff;
                    return Math.floor(netValue * 100) / 100
                }
                } else {
                    throw new Error("matchID lost")
                }
            }
            const netXG = await calculateNetXG()
            await client.db("database").collection("predictions").createIndex({userID: 1, matchID: 1}, {unique: true})
            const response = await client.db("database").collection("predictions").insertOne({
                userID: uid,
                matchID: matchID,
                season: season,
                netXG: netXG,
                side: {
                    home: {
                        predicted_xG: side.home.predicted_xG,
                        corners: side.home.corners,
                        cleanSheet: side.home.cleanSheet
                    },
                    away: {
                        predicted_xG: side.away.predicted_xG,
                        corners: side.away.corners,
                        cleanSheet: side.away.cleanSheet
                    }
                }
            });
            return response;
        } catch (error) {
            return error
        }
    }

    
    /* Yaaaaay! I got it working, so NOW lets break down what we did, so we DON'T forget this!!!
    So since side (from frontend) comes as an object, we need to access the actual "side" name (home/away) and since that's a key, we can use Object.keys to access that
    we then use updateOne (because we want to edit a PART of the data) we then filter (the first part of update within the { } ) by userID and matchID
    I then tell the update what to add in, after filtering, here we are checking side (the object) and the "key" (home or away) and we're setting this as which part
    of the data is getting updated. We then update the elements within that object, predicted_XG, corners etc;*/
    static async update(uid, mid, data) {
        const userID = new ObjectId(uid)
        const sideName = Object.keys(data)[0]
        try {
            if(typeof data !== "object" || Array.isArray(data) || Object.keys(data).length !== 1 || !["home", "away"].includes(sideName)) {
                throw new Error("Invalid data format.")
            } 
            await client.connect()
            async function updateNetXG() {
                const matched_Entry = await client.db("database").collection("matches").findOne({
                    _id: parseInt(mid)
                })

                if (!matched_Entry) {
                    throw new Error("matchID lost")
                }

                const existingPrediction = await client.db("database").collection("predictions").findOne({
                    userID: userID,
                    matchID: parseInt(mid)
                })

                if (!existingPrediction) {
                    throw new Error("Prediction not found")
                }

                const updatedPrediction = data[sideName]

                const currentHomePredicted = sideName === "home"
                    ? updatedPrediction.predicted_xG
                    : existingPrediction.side?.home?.predicted_xG

                const currentAwayPredicted = sideName === "away"
                    ? updatedPrediction.predicted_xG
                    : existingPrediction.side?.away?.predicted_xG

                const homeDiff = currentHomePredicted == null || matched_Entry.homeXG == null
                    ? 0
                    : -Math.abs(currentHomePredicted - matched_Entry.homeXG)

                const awayDiff = currentAwayPredicted == null || matched_Entry.awayXG == null
                    ? 0
                    : -Math.abs(currentAwayPredicted - matched_Entry.awayXG)

                const netValue = homeDiff + awayDiff
                return Math.floor(netValue * 100) / 100
            }
            const netXG = await updateNetXG()
            const response = await client.db("database").collection("predictions").updateOne(
                {
                    userID: userID,
                    matchID: parseInt(mid),
                },
                {
                    $set: {
                        netXG: netXG,
                        [`side.${sideName}`]: {
                            predicted_xG: parseFloat(data[sideName].predicted_xG),
                            corners: data[sideName].corners,
                            cleanSheet: data[sideName].cleanSheet
                        }
                    }
                }
            );
        return response;
        } catch (error) {
            console.log("Prediction update failed: ", error)
            throw error
        }
    }

    static async getByUserID(uid) {
        const _id = new ObjectId(uid)
        await client.connect()
        const response = client.db("database").collection("predictions").find({userID: _id})
        const predictions = await response.toArray()
        if(predictions.length >= 1) {
            return predictions
        } else {
            return `User ${uid} has made no predictions`
        }
    }

    static async getByMatchID(mid) {
        await client.connect()
        const response = client.db("database").collection("predictions").find({matchID: mid})
        const predictions = await response.toArray()
        if(predictions.length >= 1) {
            return predictions
        } else {
            return []
        }
    }
}

module.exports = Prediction
