require("dotenv").config()
const app = require("./app")


app.listen(process.env.PORT, "127.0.0.1", () => {
    console.log(`App listening on port ${process.env.PORT}`)
})
