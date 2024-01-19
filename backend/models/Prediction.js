const client = require("../database/setup")
const { ObjectId } = require("mongodb")

class Match {
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
}

module.exports = Match
