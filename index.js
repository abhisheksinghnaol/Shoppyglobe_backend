import mongoose from "mongoose"
import express from "express"
import { productRoutes } from "./routes/product.route.js";
import { userRoutes } from "./routes/user.routes.js";
import { cartRoutes } from "./routes/cart.routes.js";

const app=express()

mongoose.connect("mongodb+srv://abhisheksinghnaol:3GZ0uir8KQCGoxop@cluster0.vakkkua.mongodb.net/")
.then(()=>{
    console.log("DB connected sucessfully");
    
})
.catch((err)=>{
    console.log("Error while connecting DB")
})

app.get('/',(req,res)=>{
    res.send("welcome to root route")

})
app.use(express.json())

app.use((req,res,next)=>{
    console.log("i am middleware");
    next();
})


userRoutes(app)
cartRoutes(app)
productRoutes(app)


const PORT=8080;
app.listen(PORT,()=>{
    console.log(`Server connected to PORT:${PORT}`)
})





//abhisheksinghnaol
//3GZ0uir8KQCGoxop