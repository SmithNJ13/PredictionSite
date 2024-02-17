const { Router } = require("express")
const predictionController = require("../controllers/predictions")

const predictionRouter = Router()

predictionRouter.post("/", predictionController.create)
predictionRouter.get("/predictions", predictionController.index)
predictionRouter.get("/predictions/:id", predictionController.getUserPredictions)

module.exports = predictionRouter
