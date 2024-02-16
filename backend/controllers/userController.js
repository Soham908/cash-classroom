const Users = require("./../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn : "90d"
    })
}

exports.register = async(req,res) => {
    
    try {
        const {name , email , password} = req.body   
        const hashedPassword = await bcrypt.hash(password,12) 

        const existingUser = await Users.findOne({email})
        if(existingUser){
            return res.json({
                success : false,
                message : "User already exists"
            })
        }

        const createdUser = await Users.create({name,email,password:hashedPassword})
        const token = signToken(createdUser._id)

        res.json({
            success : true,
            token,
        })
    }
    catch(err){
        console.log(err)
        res.json({
            success : false,
            message : err
        })
    }
}

exports.login = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await Users.findOne({email})

        if(!user){
            return res.json({
                success : false,
                message : "User doesn't exist"
            })
        }

        if (!await bcrypt.compare(password,user.password)){
            return res.json({
                success : false,
                message : "Wrong password"
            })   
        }

        const token = signToken(user._id)

        res.json({
            success : true,
            token
        })
    }
    catch(err){
        console.log(err)
        res.json({
            success : false,
            err 
        })
    }
}