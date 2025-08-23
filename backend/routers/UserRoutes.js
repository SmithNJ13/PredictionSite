const { Router } = require("express")
const express = require('express');
const userController = require("../controllers/users")

const userRouter = Router()

userRouter.get("/:id/stats", userController.getUserStats)
userRouter.patch("/:id/stats", userController.updateUserStats)
userRouter.get("/:id/desc", userController.getUserDescription)
userRouter.patch("/:id/desc", express.text(), userController.updateUserDescription)
userRouter.get("/auth", userController.getUserToken)
userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)
userRouter.delete("/logout", userController.logout)

module.exports = userRouter
