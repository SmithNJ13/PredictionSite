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

const update = async(req, res) => {
    try {
        const {uid, mid} = req.params
        const data = req.body
        const prediction = await Prediction.update(uid, mid, data)
        res.status(200).send({data: prediction})
    } catch (error) {
        res.status(400).send({error: error.message || error})
    }
}

const getByUserID = async(req, res) => {
    try {
        const id = parseInt(req.params.uid)
        const userPredictions = await Prediction.getByUserID(id)
        res.status(200).send(userPredictions)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getByMatchID = async(req, res) => {
    try {
        const mid = parseInt(req.params.mid)
        const userPredictions = await Prediction.getByMatchID(mid)
        res.status(200).send(userPredictions)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {index, create, update, getByUserID, getByMatchID}
