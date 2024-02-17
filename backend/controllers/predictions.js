const Prediction = require("../models/Prediction")

const index = async(req, res) => {
    try{
        const prediction = await Prediction.getAll()
        res.status(200).send({Prediction: prediction})
    } catch (error) {
        res.status(500).send({Error: error.message})
    }
}

const create = async(req, res) => {
    try {
        const data = req.body
        const prediction = await Prediction.create(data)
        res.status(201).send({data: prediction})
    } catch (error) {
        res.status(400).send({error: error})
    }
}

const getUserPredictions = async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        const userPredictions = await Prediction.getUserPredictions(id)
        res.status(200).send(userPredictions)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {index, create, getUserPredictions}
