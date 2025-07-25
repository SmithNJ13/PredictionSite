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
        const response = client.db("database").collection("users").find({})
        const items = await response.toArray()
        const userInfo = []
        items.forEach((item) => {
            if(item.stats.total_predictions >= 18) {
                userInfo.push({
                    username: item.username,
                    total_predictions: item.stats.total_predictions,
                    average_netXG: item.stats.average_netXG
                })
            }
        })
        const leaderboard = [...userInfo].sort((a, b) => {
           return b.average_netXG - a.average_netXG
        })
        return leaderboard
    }
}

module.exports = Leaderboard
