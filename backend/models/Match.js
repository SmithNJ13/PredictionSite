const client = require("../database/setup")
const { ObjectId } = require("mongodb")

class Match {
    constructor(data) {
        this.id = data.id
        this.date = data.date
        this.opponent = data.opponent
        this.xG = data.xG
        this.xGA = data.xGA
    }

    static async getAll() {
        await client.connect()
        const response = await client.db("database").collection("statistics").find({})
        const all = await response.toArray()
        return all;
    }
}

module.exports = Match
