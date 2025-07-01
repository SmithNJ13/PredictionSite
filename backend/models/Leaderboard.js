const client = require("../database/setup")
const { ObjectId } = require("mongodb")

class Leaderboard {
    constructor(data) {
        this.id = data._id
        this.date = data.date
        this.time = data.time
        this.home = data.home
        this.homeXG = data.homeXG
        this.away = data.away
        this.awayXG = data.awayXG
    }

    static async getAll() {
        await client.connect()
        const response = client.db("database").collection("leaderboard").find({})
        const all = await response.toArray()
        return all;
    }
}

module.exports = Leaderboard
