
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")

const User = require("../models/userModel")

exports.isAuth = catchAsyncErrors(async(req,res,next)=>{

     const {token} = req.cookies
     console.log(token)


     if(!token)
     {
        return next(new ErrorHandler("Please Login to access this resource",401))
     }

     const decodedToken = jwt.verify(token, process.env.JWTSECRET_KEY) 
     console.log(decodedToken)


     req.user = await User.findById(decodedToken.id)

     console.log(req.user)

     next()

})

