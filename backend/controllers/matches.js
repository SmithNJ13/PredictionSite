const Match = require("../models/Match")

const index = async(req, res) => {
    try{
        const match = await Match.getAll()
        res.status(200).send({Match: match})
    }
    catch (error) {
        res.status(500).send({Error: error.message})
    }
}

module.exports = {index}
