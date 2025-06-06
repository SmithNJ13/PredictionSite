const { Router } = require("express")
const userController = require("../controllers/users")

const userRouter = Router()

userRouter.get("/", userController.index)
userRouter.get("/auth", userController.getUserToken)
userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)
userRouter.delete("/logout", userController.logout)

module.exports = userRouter
