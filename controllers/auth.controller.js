import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


//register
export async function register(req,res){
    try{
        let {firstName,email,password}=req.body;
        const existinguser=await UserModel.findOne({email})
        if(existinguser) return res.status(404).json({message:"email already exist"})
           const newUser= await UserModel.create({
            firstName,
            email,
            password:bcrypt.hashSync(password, 10)})
           return  res.status(201).json(newUser._id)

    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

//login

export async function login(req,res){
    try{
        let {email,password}=req.body;
        const user=await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({message:"email does not exist"})
        }   
        let validPassword=bcrypt.compareSync(password, user.password);
        if(!validPassword) return res.status(403).json({message:"Incorrect credentials"})
            let token = jwt.sign({ id:user._id }, "secretkey", { expiresIn: '60m' });
            return res.status(200).json({
        user:{
            email:user.email,
            firstName:user.firstName,
            accessToken:token
        }})

    }
    catch(err){
            return res.status(500).json({message:err.message})

    }
}