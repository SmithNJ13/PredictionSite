const Match = require("../models/Match")

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = String(currentDate.getMonth() + 1).padStart(2, "0")
const day = String(currentDate.getDate()).padStart(2, "0")  
// const date = `${year}-${month}-${day}`
const date = `2023-12-28`

const index = async(req, res) => {
    try{
        const match = await Match.getAll()
        res.status(200).send({Match: match})
    }
    catch (error) {
        res.status(500).send({Error: error.message})
    }
}

const getOne = async(req, res) => {
    const motd = await Match.getByDate(date)
    res.status(200).send(motd)
}

module.exports = {index, getOne}
