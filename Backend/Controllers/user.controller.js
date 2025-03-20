const User = require('../Models/user.model');
const uploadOnCloudinary = require('../config/cloudinary');



const registerUser = async(req, res)=>{
    try
    {
        const {username, email, password} = req.body;
        const imageUrl = req.file?.path;
        console.log("File received from Multer:", req.file.path);

        if(!username || !email || !password)
        {
            return res.status(400).json({
                message: "all fields are required.....",
                error: true,
                success: false
            })
        }

        const user = await User.findOne({email});
        if(user)
        {
            return res.status(401).json({
                message: "user is already registered please go to login page",
                error: true,
                success: false
            })
        }


        const uploadImage = await uploadOnCloudinary(imageUrl);
        if(!uploadImage)
        {
            return res.status(500).json({
                message: "error uploading file",
                error: true,
                success: false
            })
        }

        const newUser = await User.create({
            username,
            email,
            password,
            image: uploadImage.secure_url
        })

        const token = newUser.getSignedJwtToken();

        await newUser.save();

        return res.status(202).json({
            message: "new User is created successfully...",
            error: false,
            success: true,
            data: newUser 
        })



    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}


const loginUser = async(req, res)=>{
    try
    {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!email || !password)
            {
                return res.status(401).json({
                    message: "please fill the desired fields",
                    error: true,
                    success: false
                })
            }
        if(password !== user.password)
        {
            return res.status(402).json({
                message: "Invalid credential...",
                error: true,
                success: false
            })
        }


        if(!user)
        {
            return res.status(401).json({
                message: "user is not registered so please regiter it first",
                error: true,
                success: false
            })
        }

        const isMatch = await user.matchPassword(password);

        const token = await user.getSignedJwtToken();

        return res.status(200).json({
            message:"user login successfully....",
            error: false,
            success: true,
            data: {
                email,
                password
            },
            token
        })

    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}


const getUser = async(req, res)=>{
    try
    {
        const user = await User.findById(req.params.id);
        if(!user)
        {
            return res.status(402).json({
                message: "user is not present",
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            message: "user is found",
            error: true,
            success: false,
            data: user
        })
    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}


module.exports = {registerUser, loginUser, getUser};