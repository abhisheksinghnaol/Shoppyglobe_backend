import { addToCart, getItems, removeFromCart, updateCartItem } from "../controllers/cart.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";




export function cartRoutes(app){
    app.get('/api/cart',verifyToken,getItems)
    app.post('/api/cart',verifyToken,addToCart)
    app.put('/api/cart/:productId',verifyToken,updateCartItem)
    app.delete('/api/cart/:productId',verifyToken,removeFromCart)

}