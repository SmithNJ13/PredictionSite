const Leaderboard = require("../models/Leaderboard")

const index = async(req, res) => {
    try{
        const match = await Leaderboard.getAll()
        res.status(200).send({Match: match})
    }
    catch (error) {
        res.status(500).send({Error: error.message})
    }
}

module.exports = {index}
