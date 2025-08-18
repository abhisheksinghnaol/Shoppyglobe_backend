import { login, register } from "../controllers/auth.controller.js";



export function userRoutes(app){
    app.post('/api/register',register)
    app.post('/api/login',login)
}