const { Router } = require("express")
const MatchController = require("../controllers/matches")

const MatchRouter = Router()

MatchRouter.get("/", MatchController.getOne)
MatchRouter.get("/matches", MatchController.index)
MatchRouter.get("/matches/:id", MatchController.getByID)

module.exports = MatchRouter

