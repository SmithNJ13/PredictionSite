const { Router } = require("express")
const MatchController = require("../controllers/matches")

const MatchRouter = Router()

MatchRouter.get("/", MatchController.index)

module.exports = MatchRouter
