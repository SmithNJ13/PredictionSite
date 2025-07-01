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

    static async check(uid, mid) {
        try{
            await client.connect()
            const response = client.db("database").collection("predictions").findOne({
                userID: parseInt(uid),
                matchID: parseInt(mid)
            })
            return response
        } catch (error) {
            return error
        }
    }
    
    static async update(uid, mid, data) {
        /* Yaaaaay! I got it working, so NOW lets break down what we did, so we DON'T forget this!!!
        So since side (from frontend) comes as an object, we need to access the actual "side" name (home/away) and since that's a key, we can use Object.keys to access that
        we then use updateOne (because we want to edit a PART of the data) we then filter (the first part of update within the { } ) by userID and matchID
        I then tell the update what to add in, after filtering, here we are checking side (the object) and the "key" (home or away) and we're setting this as which part
        of the data is getting updated. We then update the elements within that object, predicted_XG, corners etc;*/
        try {
            await client.connect()
            const sideName = Object.keys(data)[0]
            const response = await client.db("database").collection("predictions").updateOne(
                {
                    userID: parseInt(uid),
                    matchID: parseInt(mid)
                },
                {
                    $set: {
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
