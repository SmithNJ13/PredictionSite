const {ObjectID} = require("mongodb")
const client = require("../database/setup")

class User {
    constructor(data) {
        this.id = data._id,
        this.username = data.username,
        this.email = data.email,
        this.password = data.password
    }

    static async getAll() {
        await client.connect()
        const response = await client.db("database").collection("users").find({})
        const all = await response.toArray()
        return all;
    }
}

module.exports = User
