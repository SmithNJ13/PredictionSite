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
        const token = req.headers["autherization"]
    } catch (error) {
        res.status(404).json({error: error})
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

module.exports = {index, register}
