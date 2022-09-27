
const User = require("../models/userModel")
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middlewares/catchAsyncError")
const sendToken = require("../utils/jwtToken")


//Register a User
exports.registerUser = catchAsyncErrors(async(req,res,next) =>{

    const {firstName,middleName,lastName,email,password,phone,country,role} = req.body

    const user = await User.create({
        firstName,middleName,lastName,email,password,phone,country,role
    })
    sendToken(user,201,res)
})


//Login a User
exports.loginUser = catchAsyncErrors(async(req,res,next) => {

    const {email,password,role} = req.body

    //checking if user has entered both email and password
    if(!email||!password||!role){ 
        return next(new ErrorHandler("Please Enter Email and password and role",400))
    }

    const user = await User.findOne({email})

    if(!user)
    {
        return next(new ErrorHandler("Invalid email or password or role",401))
    }

    const isPasswordMatched = await user.comparePassword(password)
    

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    //console.log(password)
    //console.log(user.password)
     if(req.body.role!==user.role){
        return next(new ErrorHandler("Invalid role",401))
     }
   

sendToken(user,200,res)

})

