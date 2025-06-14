import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import { type } from "os";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Invalid email"],
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String, 
            enum: ["admin", "doctor", "receptionist"],
            required: true,
        },
        loginId: {
            type: String,
            unique: true,
        },
        about: {        
            type: new Schema({
                experience: {
                    type: String
                },
                education: {
                    type: String
                },
            },{_id: false})
        },
        specialization: {
            type: String, 
        },
        phone: {
            type: String
        },
        profilePicture: {
            type: String,
            default: "https://res.cloudinary.com/dl96cbqkg/image/upload/v1749824775/default_lkmhfk.jpg"
        },
        consultationFee: {
            type: Number,
            default: 0
        },
        available: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String
        },
    },{timestamps: true});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema); 