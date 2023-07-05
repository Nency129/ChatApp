const jwt = require('jsonwebtoken');
const User=require("../Models/userModel");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" })
}

// Register
const registerUser=async(req,res)=>{
    const {name,email,password,pic}=req.body;
    try {
        const user = await User.signup(name,email, password,pic)
        const token = createToken(user._id)

        res.status(200).json({ email, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// login
const authUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)

        res.status(200).json({ email, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }


}

module.exports={registerUser,authUser};