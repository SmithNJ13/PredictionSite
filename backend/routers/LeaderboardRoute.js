const { Router } = require("express")
const LeaderboardController = require("../controllers/leaderboard")

const LeaderboardRouter = Router()

LeaderboardRouter.get("/", LeaderboardController.index)

module.exports = LeaderboardRouter

