const User = require("../models/User")
const Token = require("../models/Token")
const { ObjectId } = require("mongodb");
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

const getUserStats = async(req, res) => {
    try {
        const uid = req.params.id
        if(!ObjectId.isValid(uid)) {
            return res.status(400).send({error: "Invalid userID."})
        }
        const userStats = await User.getStats(uid)
        if(!userStats) {
            return res.status(400).send({error: "User not found."})
        }
        res.status(200).send(userStats)
    } catch (error) {
        console.log(error)
    }
}

const updateUserStats = async(req, res) => {
    try {
        const uid = req.params.id
        const { mode } = req.body
        if(!ObjectId.isValid(uid)) {
            return res.status(400).send({error: "Invalid userID"})
        }
        if (!["create", "update"].includes(mode)) {
            return res.status(400).send({ error: "Invalid mode" })
        }
        const update = await User.updateStats(uid, mode)
        if(update.modifiedCount === 0) {
            return res.status(400).send("No user stats were updated.")
        }
        res.status(200).send({updated: update})
    } catch (error) {
        return res.status(500).send(error.message || "Something went wrong.")
    }
}

const getUserDescription = async(req, res) => {
        try {
        const uid = req.params.id
        if(!ObjectId.isValid(uid)) {
            return res.status(400).send({error: "Invalid userID."})
        }
        const userStats = await User.getDescription(uid)
        if(!userStats) {
            return res.status(400).send({error: "User not found."})
        }
        res.status(200).send(userStats)
    } catch (error) {
        console.log(error)
    }
}

const updateUserDescription = async (req, res) => {
  try {
    const uid = req.params.id
    const data = req.body

    if (!ObjectId.isValid(uid)) {
      return res.status(400).send({ error: "Invalid userID" })
    }

    if (typeof data !== "string") {
      return res.status(400).send({ error: "Invalid data format, expected plain string." })
    }

    const update = await User.updateDescription(uid, data)

    if (update.modifiedCount === 0) {
      return res.status(400).send("Description was not updated.")
    }

    res.status(200).send({ updated: update })
  } catch (error) {
    console.error(error)
    res.status(500).send("Server error.")
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

module.exports = {index, register, getUserToken, getUserStats, updateUserStats,
    updateUserDescription, getUserDescription, login, logout}
