const { Router } = require("express")
const predictionController = require("../controllers/predictions")

const predictionRouter = Router()

predictionRouter.post("/", predictionController.create)
predictionRouter.patch("/", predictionController.update)
predictionRouter.get("/predictions", predictionController.index)
predictionRouter.get("/predictions/:id", predictionController.getAllUserPredictions)
predictionRouter.get("/predictions/:id/:mid", predictionController.getAllUserMatchPredictions)

module.exports = predictionRouter
