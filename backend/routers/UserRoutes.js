const { Router } = require("express")
const userController = require("../controllers/users")

const userRouter = Router()

userRouter.get("/", userController.index)

module.exports = userRouter
