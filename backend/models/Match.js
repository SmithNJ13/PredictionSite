const client = require("../database/setup")
const { ObjectId } = require("mongodb")

class Match {
    constructor(data) {
        this.id = data._id
        this.date = data.date
        this.opponent = data.opponent
        this.xG = data.xG
        this.xGA = data.xGA
    }

    static async getAll() {
        await client.connect()
        const response = await client.db("database").collection("matches").find({})
        const all = await response.toArray()
        return all;
    }

    static async getByDate(date) {
        await client.connect()
        const response = await client.db("database").collection("matches").find({date: date})
        const motd = await response.toArray()
        if(motd.length <= 0) {
            return "No matches today!"
        } else {
            return motd
        }
    }
}

module.exports = Match
