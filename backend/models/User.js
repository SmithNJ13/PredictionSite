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
    const responseOne = client.db("database").collection("predictions").find({userID: id})
    const predictions = await responseOne.toArray()

    await client.connect()
    const response = await client.db("database").collection("users")
      .findOne(
        { _id: id },
        { projection: { stats: 1, _id: 0 } }
      )
    return response
  }

  static async updateStats(uid, mode) {
    const _id = new ObjectId(uid) 
    try {
      const response = client.db("database").collection("predictions").find({userID: _id})
      const predictions = await response.toArray()
      let average_netXG = 0
      predictions.forEach((element) => {
          if(element.netXG !== null && element.netXG !== undefined) {
              average_netXG += element.netXG
          }
      })
      if(mode === "create") {
        const update = await client.db("database").collection("users").updateOne(
          {_id: _id},
          {$set: {
            "stats.total_predictions": predictions.length,
            "stats.average_netXG": -parseFloat((Math.abs(average_netXG) / predictions.length).toFixed(3))
          }})
        return update
      }
      if(mode === "update") {
        const update = await client.db("database").collection("users").updateOne(
          {_id: _id},
          {$set: {
            "stats.average_netXG": -parseFloat((Math.abs(average_netXG) / predictions.length).toFixed(3))
          }})
        return update
      }
    } catch (error) {
      return error
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
  
  static async updateDescription(uid, data) {
    const id = new ObjectId(uid);
    await client.connect();
    const response = await client.db("database").collection("users").updateOne(
      { _id: id },
      { $set: { description: data } }
    );
    return response;
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
