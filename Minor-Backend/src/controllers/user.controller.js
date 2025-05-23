import { asyncHandler } from '../utils/asyncHandler.js' 
import { ApiError }  from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import  { User } from  '../models/user.model.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto';

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, "something went wrong while refresh and access token")
    }
}

const generateId = (role) => {
    const roleMap = {
        admin: 'ADM',
        doctor: 'DOC',
        receptionist: 'REC'
    };

    if (!roleMap[role?.toLowerCase()]) {
        throw new Error("Invalid role");
    }

    const prefix = roleMap[role.toLowerCase()];
    const uniqueId = crypto.randomUUID().replace(/-/g, '').slice(0, 8); // 8 characters

    return `${prefix}-${uniqueId}`;
};

const registerUser = asyncHandler( async (req, res) => {
    
    const {name, email, password, role, phone, specialization, about} = req.body;

    if([name, email, password, role, phone, specialization].some((field) => field?.trim() === "" )) {
        throw new ApiError(400, "All fields are required");
    }

    if (role === "doctor" && !specialization?.trim()) {
        throw new ApiError(400, "Specialization is required for doctors");
    }

    const existedUser = await User.findOne({
        $and: [{ name }, { email },{role}]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or Username already exists");
    }

    const loginId = generateId(role);

    const userData = {
        name,
        email,
        password,
        role,
        loginId,
        phone,
    };
    if (role === "doctor") {
        userData.specialization = specialization;
        userData.about = about;
    }

    const user = await User.create(userData);
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser) throw new ApiError(500, "Something went wrong registering user");

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User Registered Successfully")
    )
})

const loginUser = asyncHandler( async (req, res) => {
    
    const {loginId, password, role} = req.body;
    console.log(req.body);
    if(!loginId && !password && !role) {
        throw new ApiError(400, "loginId, password and role is required");
    }

    const user = await User.findOne({loginId});
    if(!user) {
        throw new ApiError(404, "User does not exists");
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    if (user.role !== role) {
        throw new ApiError(403, "Role mismatch — access denied");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findOne(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {
            user: loggedInUser,
            accessToken,
            refreshToken
        },"User logged In Successfully")
    )

})

const logoutUser = asyncHandler( async (req, res) => {
    const loginId = req.user.loginId
    
    let user = await User.findOne({loginId})

    user.refreshToken = null
    await user.save();

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User Logged Out")
    )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.body.refreshToken || req.cookies.refreshToken; //cookie not working 

    if(!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id);
        if(!user) {
            throw new ApiError(401, "Invalid RefreshToken")
        }
    
    
        if(incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const  {accessToken, newRefreshToken }= await generateAccessAndRefreshTokens(user._id);
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(new ApiResponse(200, 
            {
                accessToken,
                refreshToken: newRefreshToken
            },
            "Access Token Refreshed"
        ))
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh token")
    }
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const {name, email, role, specialization, phone, _id, about } = req.body
    if([name, email, role, phone, specialization].some((field) => field?.trim() === "" )) {
        throw new ApiError(400, "All fields are required")
    }

    const updateFields = {
        name,
        email,
        specialization,
        phone,
    };

    if (about && typeof about === 'object') {
        updateFields.about = {
            experience: about.experience,
            education: about.education,
            description: about.description
        };
    }
    
    const user = await User.findByIdAndUpdate(
        _id,
        { $set: updateFields },
        { new: true }
    ).select("-password -refreshToken");

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details Updated"))
})

const getUserProfile = asyncHandler(async (req, res) => {

    const id  = req.user._id;
    
    const user = await User.findById(id).select('-password -refreshToken');

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    res.status(200)
    .json(
        new ApiResponse(200, user, 'User profile fetched successfully')
    );
});

const deleteUser = asyncHandler(async (req, res) => {
    if (req.user.role !== 'admin') {
        throw new ApiError(403, 'Access denied');
    }

    const { loginId } = req.params;
    
    const user = await User.findOneAndDelete({ loginId });

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    res.status(200).json(new ApiResponse(200, {}, 'User deleted successfully'));
});

const getUsersByRole = asyncHandler(async (req, res) => {
    const { role } = req.params; 
    
    const validRoles = ['admin', 'doctor', 'receptionist']; 
    if (!validRoles.includes(role.toLowerCase())) {
        throw new ApiError(400, 'Invalid role provided');
    }

    try {
        const users = await User.find({ role }).select('-password -refreshToken');

        if (!users || users.length === 0) {
            throw new ApiError(404, `No ${role}s found`);
        }

        res.status(200).json(
            new ApiResponse(200, users, `${role}s fetched successfully`)
        );
    } catch (error) {
        throw new ApiError(500, `Something went wrong while fetching ${role}s`);
    }
});

/* TODO
forgotPassword
resetPassword
*/
export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updateAccountDetails,
    getUserProfile,
    deleteUser,
    getUsersByRole
}