import { createProduct, getproduct, getproducts } from "../controllers/product.controller.js";

export function productRoutes(app) {
    app.post("/api/product", createProduct);     //add product
    app.get("/api/products", getproducts);       // fetch all products
    app.get("/api/product/:id", getproduct);    // fetch single product by ID
 
}
