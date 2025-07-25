const Leaderboard = require("../models/Leaderboard")

const index = async(req, res) => {
    try{
        const leaderboard = await Leaderboard.getAll()
        res.status(200).send(leaderboard)
    }
    catch (error) {
        res.status(500).send({Error: error.message})
    }
}

module.exports = {index}
