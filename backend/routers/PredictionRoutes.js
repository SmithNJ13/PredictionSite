const { Router } = require("express")
const userController = require("../controllers/users")

const predictionRouter = Router()

predictionRouter.get("/", userController.index)

module.exports = predictionRouter
