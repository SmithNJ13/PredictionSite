const { Router } = require("express")
const predictionController = require("../controllers/predictions")

const predictionRouter = Router()

predictionRouter.get("/", predictionController.index)

module.exports = predictionRouter
