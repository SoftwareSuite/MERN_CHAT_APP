import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if(!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({message: "All fields are required."})
        } 

        if(password !== confirmPassword) {
            return res.status(400).json({message: "Password does not match."})
        }

        const user = await User.findOne({username})
        if(user) {
            return res.status(400).json({message: "User already exists. Please login or try a unique username."})
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        // Profile Photos links
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const feMaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`
        
        const newUser = new User({
            fullName,
            username, 
            password: hashedPassword, 
            profilePhoto: gender === "male" ? maleProfilePhoto : feMaleProfilePhoto ,
            gender
        })
        await newUser.save()
        res.status(200).json({message:"User created successfully"});
    } catch (error) {
        console.log(error);
    }
};

export const login = async ( req , res ) => {
    try {
        const { username, password } = req.body;
        if(!username || !password) {
            return res.status(401).json({message: "Invalid credentials.", success: false});
        }
        const user = await User.findOne({ username});
        if(!user) {
            return res.status(401).json({message: "User doest not exist. Please register.", success: false});
        }
        const matchedPassword = bcryptjs.compareSync(password, user.password);
        if (!matchedPassword) {
            return res.status(401).json({message: "Invalid credentials.", success: false});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        return res.status(200).cookie("access_token", token, {maxAge: 24*60*60*1000, httpOnly: true})
        .json({
            message: "User Logged in successfully",
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePhoto: user.profilePhoto,
            gender: user.gender
        })

    } catch (error) {
        console.log(error);
    }
}

export const logout = (req, res) => {
    try {
        return res.status(200).cookie("access_token", "", {maxAge: 0}).json({
            message: "User logged out successfully."
        })
    } catch (error) {
        console.log(error);
    }
}

export const getOtherUsers = async (req, res) =>{
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")
        return res.status(200).json(otherUsers)
    } catch (error) {
        console.log(error)
    }
}