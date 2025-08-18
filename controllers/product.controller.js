import ProductModel from "../model/Product.model.js";





export async function getproducts(req,res){
    const products=await ProductModel.find()
    return res.json(products)
}


export async function getproduct(req,res){
    const _id=req.params.id
    const prod=await ProductModel.findById(_id)
    if(!prod){
        return res.status(404).json({message:"Product not found"})
    }
   return res.json(prod)
}
//  CREATE product
export async function createProduct(req, res) {
  try {
    const { name, price, description, stockQty } = req.body;
    console.log("received body:",req.body);
    const newProduct = new ProductModel({
      name,
      price,
      description,
      stockQty,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
}


