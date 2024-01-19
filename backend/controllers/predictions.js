const Prediction = require("../models/Prediction")

const index = async(req, res) => {
    try{
        const prediction = await prediction.getAll()
        res.status(200).send({Prediction: prediction})
    } catch (error) {
        res.status(500).send({Error: error.message})
    }
}

module.exports = {index}
