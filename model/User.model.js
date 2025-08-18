import mongoose from "mongoose"


const userSchema=new mongoose.Schema({
    firstName:String,
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
    
})


const UserModel=new mongoose.model("User",userSchema)

export default UserModel;