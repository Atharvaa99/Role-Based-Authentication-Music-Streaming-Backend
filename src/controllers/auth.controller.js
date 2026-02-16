const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


async function registerUser(req,res){

    const{userName, email, password, role='user'} = req.body;

    const isUserExists = await userModel.findOne({
        $or:[
            {userName},
            {email}
        ]
    })

    const hash = await bcrypt.hash(password,10);

    if(isUserExists){
        return res.status(409).json({
            message: 'user already exists'
        })
    }

    const user = await userModel.create({
        userName,
        email,
        password: hash,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role
    },
    process.env.JWT_SECRET);

    res.cookie('token',token);

    res.status(201).json({
        message: 'User Register Successfully',
        user
    })


}

async function loginUser(req,res){

    const {userName, email, password} = req.body;

    const user = await userModel.findOne({
        $or:[
            {userName},
            {email}
        ]
    })

    if(!user) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET);

    res.cookie('token',token);

    res.status(200).json({
        message: 'Login successfull',
        user
    })
}

async function logOut(req,res){
    res.clearCookie("token");
    res.status(200).json({message: "Loged out successfully"});
}

module.exports = {registerUser,loginUser, logOut};