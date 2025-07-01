const { Router } = require("express")
const predictionController = require("../controllers/predictions")

const predictionRouter = Router()

predictionRouter.get("/", predictionController.index)
predictionRouter.get("/user/:uid", predictionController.getByUserID)
predictionRouter.get("/match/:mid", predictionController.getByMatchID)
predictionRouter.post("/", predictionController.create)
predictionRouter.patch("/:uid/:mid", predictionController.update)

module.exports = predictionRouter
