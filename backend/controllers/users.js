const User = require("../models/User")
const Token = require("../models/Token")
const bcrypt = require("bcryptjs") 

const index = async(req, res) => {
    try{
        const user = await User.getAll()
        res.status(200).json({
            success: true,
            user: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Users unavailable",
            error: error
        })
    }
}

const getUserToken = async(req, res) => {
    try {
        const token = req.headers["authorization"]
        if(!token) {
            return res.status(401).json({error: "No token provided."})
        }
        const tokenObject = await Token.getToken(token)
        if(!tokenObject) {
            return res.status(401).json({error: "Invalid token."})
        }
        const userID = tokenObject.userID
        const user = await User.getById(userID)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const register = async(req, res) => {
    try {
        const data = req.body
        const rounds = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))
        data["password"] = await bcrypt.hash(data["password"], rounds)
        const userInfo = await User.create(data)
        res.status(201).send(userInfo)
    } catch (error) {
        res.status(403).json({
            error: error.message
        })
    }
}

const login = async(req, res) => {
    const data = req.body
    try {
        const user = await User.getUser(data.name)
        if(!user) {
            return res.status(400).json({
                message: "Incorrect username or email.",
                data: data
            })
        } else {
            const password = await bcrypt.compare(data.password, user.password)
            if (!password) {
                return res.status(400).json({
                    message: "Incorrect password."
                })
            } else {
                const token = await Token.create(user._id)
                res.status(200).json({authenticated: true, token: token, userID: user._id})
            }
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const logout = async(req, res) => {
    try {
        const token = req.headers["authorization"]
        await Token.destroy(token)
        res.send({authenticated: false})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = {index, register, getUserToken, login, logout}
