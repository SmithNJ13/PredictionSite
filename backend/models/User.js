const { ObjectId } = require("mongodb");
const client = require("../database/setup");

class User {
  constructor(data) {
    this.id = data._id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
  }

  static async getAll() {
    await client.connect();
    const response = await client.db("database").collection("users").find({});
    const all = await response.toArray();
    return all;
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

    const maxIdResponse = await client
      .db("database")
      .collection("users")
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    let maxId = -1;
    if (maxIdResponse.length > 0) {
      maxId = maxIdResponse[0]._id;
    }
    const nextId = maxId + 1;

    const response = await client.db("database").collection("users").insertOne({
      _id: nextId,
      username: username,
      email: email,
      password: password,
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
