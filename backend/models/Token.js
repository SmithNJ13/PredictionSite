const { v4: uuidv4 } = require("uuid")
const client = require("../database/setup")
const { ObjectId } = require("mongodb")

class Token {
    constructor({_id, userID, token}) {
        this.id = _id,
        this.userID = userID,
        this.token = token
    }

    static async create(userID) {
        const token = uuidv4()
        const response = await client.db("database").collection("tokens").insertOne({
            userID: userID,
            token: token
        })
        const newToken = await Token.getToken(token)
        return newToken
    }

    static async getToken(token) {
        if (token.startsWith("Bearer ")) {
            token = token.slice(7)
        }
        const response = await client.db("database").collection("tokens").find({
            token: token
        })
        const value = await response.toArray()
        if(value.length === 0) {
            return null
        }
        const tokenObject = new Token(value[0])
        return tokenObject
    }

    static async destroy(token) {
        await client.connect()
        const response = await client.db("database").collection("tokens").deleteOne({
            token: token
        })
        return response
    }
}

module.exports = Token
