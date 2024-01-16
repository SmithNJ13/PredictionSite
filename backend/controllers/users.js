const User = require("../models/User")

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
