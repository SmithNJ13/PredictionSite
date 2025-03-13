const { v4: uuidv4 } = require("uuid")
const client = require("../database/setup")

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
        const response = await client.db("database").collection("tokens").find({
            token: token
        })
        const value = await response.toArray()
        const tokenObject = new Token(value[0])
        return tokenObject
    }

    static async destroy(data) {
        await client.connect()
        const token = data.token 
        const response = await client.db("database").collection("tokens").deleteOne({
            token: token
        })
        return res.send(200)
    }
}

module.exports = Token
