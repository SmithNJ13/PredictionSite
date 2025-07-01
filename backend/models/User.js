const { ObjectId } = require("mongodb");
const client = require("../database/setup");

class User {
  constructor(data) {
    this.id = data._id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.description = data.description;
    this.image = data.image;
    this.stats = data.stats;
  }

  static async getAll() {
    await client.connect();
    const response = await client.db("database").collection("users").find({});
    const all = await response.toArray();
    return all;
  }

  static async getStats(uid) {
    const id = new ObjectId(uid)
    await client.connect()
    const response = await client.db("database").collection("users")
      .findOne(
        { _id: id },
        { projection: { stats: 1, _id: 0 } }
      )
    return response
  }

  static async updateStats(uid, data) {
    const id = new ObjectId(uid)
    try {
      if (typeof data !== "object" || Array.isArray(data) || Object.keys(data).length === 0 || !Object.keys(data).every((key) =>
        ["ranking", "total_predictions", "average_netXG"].includes(key))) {
          throw new Error("Invalid data format.")}
      await client.connect()
      const updateFields = {}

      if (data.ranking !== undefined) {
        updateFields["stats.ranking"] = data.ranking
      }
      if (data.total_predictions !== undefined) {
        updateFields["stats.total_predictions"] = data.total_predictions
      }
      if (data.average_netXG !== undefined) {
        updateFields["stats.average_netXG"] = data.average_netXG
      }

      const response = await client.db("database").collection("users").updateOne(
        { _id: id },
        { $set: updateFields }
      )
      return response
    } catch (error) {
      throw error
    }
  }

  static async getDescription(uid) {
        const id = new ObjectId(uid)
    await client.connect()
    const response = await client.db("database").collection("users")
      .findOne(
        { _id: id },
        { projection: { description: 1, _id: 0 } }
      )
    return response ? response.description : null
  }


  static async create({ username, email, password }) {
    await client.connect();

    const existingUser = await client
      .db("database")
      .collection("users")
      .findOne({ email: email });

    if (existingUser) {
      return ({message: "A user with this email already exists"});
    }
    
    const response = await client.db("database").collection("users").insertOne({
      username: username,
      email: email,
      password: password,
      description: "Hello! I am a new user.",
      image: "https://files.softicons.com/download/application-icons/msn-icons-by-chris-scholten/ico/offline.ico",
      stats: {
        ranking: 0,
        total_predictions: 0,
        average_netXG: 0
      }
    });

    return {message: "User created successfully", user: response};
  }

  static async getById(idx) {
    await client.connect()
    const id = idx
    const response = await client.db("database").collection("users").find({
      _id: id
    })
    const value = await response.toArray()
    const user = new User(value[0])
    user["id"] = id
    return user
  }

  static async getUser(name) {
    await client.connect()
    const response = await client.db("database").collection("users").findOne({
      $or: [
        {username: name},
        {email: name}
      ]
    })
    return response
  }
}

module.exports = User;
