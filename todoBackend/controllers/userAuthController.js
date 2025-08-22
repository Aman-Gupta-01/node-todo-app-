import userSchema from '../models/userAuthModel.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    const { email, password, name } = req.body;
    const emailIsAlreadyRegistered = await userSchema.findOne({email})
console.log(emailIsAlreadyRegistered, 'aman.gupta');

    if (emailIsAlreadyRegistered) {
        res.status(400)
        throw new Error("This email is already registered");
    }

    if (!email || !password || !name) {
        res.status(400)
        throw new Error("All fields are required");
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const userRegisterd = await userSchema.create({
        name,
        email,
        password: hashedPassword,
    })

    if (userRegisterd) {
        res.status(200).json({
            message: "user created successfully",
            name: userRegisterd.name,
            email: userRegisterd.email,
        })        
    } else {
        res.status(400)
        throw new Error("failed to create user, retry or contact support.");
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email, !password) {
        res.status(400)
        throw new Error("All fields are required");
    }

    const user = await userSchema.findOne({email})

    if (!user) {
        res.status(400)
        throw new Error("user not found");
    }

    const isPasswordMatched = bcrypt.compare(password, user.password)

    if (isPasswordMatched) {
        const ACCESS_TOKEN = jwt.sign({
            user:{
                email: user.email,
                name: user.name,
                id: user.id,
            }
        }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ACCESS_TOKEN})
    } else {
        res.status(400)
        throw new Error("Login attempt failed.");
    }
}

export const getAllUsers = async (req, res) => {
    const allUsers = await userSchema.find()
    res.status(200).json({allUsers})
}