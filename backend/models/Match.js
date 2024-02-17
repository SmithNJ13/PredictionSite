const client = require("../database/setup")
const { ObjectId } = require("mongodb")

class Match {
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
        const response = client.db("database").collection("matches").find({})
        const all = await response.toArray()
        return all;
    }

    static async getByDate(date) {
        await client.connect()
        const response = client.db("database").collection("matches").find({date: date})
        const games = await response.toArray()
        if(games.length <= 0) {
            return false
        } else {
            return games
        }
    }

    static async getByID(id) {
        await client.connect()
        const response = client.db("database").collection("matches").find({_id: id})
        const game = await response.toArray()
        if(game.length >= 1) {
            return game
        } else {
            return `No matches with ID: ${id} found!`
        }
    }
}

module.exports = Match
