const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please Enter first name"]
        
    },

    middleName:{
        type:String,
        required:[true,"Please Enter middle name"]
    },

    lastName:{
        type:String,
        required:[true,"Please Enter last name"]
    },

    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a Valid Email"]
     },

     password:{
        type:String,
        required:[true,"Please Enter Your Password"],
     },

     phone:{
        type:Number,
        required:[true,"Please enter phone number"]
     },

     country:{
        type:String,
        required:[true,"please enter country name"]
     },

     role:{
        type:String,
        required:[true,"Please enter your role"]
     }


})



//hashing password before saving to database
userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

//JWT TOKEN
userSchema.methods.getJWTToken = function() { // this can only be used inside normal function and not arrow function
       
    const token = jwt.sign({id:this._id, email: this.email},process.env.JWTSECRET_KEY,
        {
            expiresIn:process.env.JWT_EXPIRE
        })
    return token
}


//compare Password
userSchema.methods.comparePassword = async function (enteredPassword){
   // console.log(enteredPassword)
    //console.log(this.password)
      
    return await bcrypt.compare(enteredPassword,this.password)//this.password is hashed password saved in database
         
}



module.exports = mongoose.model("User",userSchema)
