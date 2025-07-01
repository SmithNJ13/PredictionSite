const { Router } = require("express")
const MatchController = require("../controllers/matches")

const MatchRouter = Router()

MatchRouter.get("/", MatchController.index)
MatchRouter.get("/live", MatchController.getOne)
MatchRouter.get("/:id", MatchController.getByID)
MatchRouter.get("/team/:team", MatchController.getByTeam)

module.exports = MatchRouter

