const { Router } = require("express")
const MatchController = require("../controllers/matches")

const MatchRouter = Router()

MatchRouter.get("/", MatchController.getOne)
MatchRouter.get("/matches", MatchController.index)

module.exports = MatchRouter
