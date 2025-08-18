import CartModel from "../model/Cart.model.js";
import ProductModel from "../model/Product.model.js";

//  Get all cart items
export async function getItems(req, res) {
  try {
    let cart = await CartModel.findOne({ user: req.user.id }).populate("items.product");

    if (!cart) {
      // if cart doesn't exist, return empty cart instead of null
      cart = { user: req.user.id, items: [] };
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//  Add product to cart
export async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await CartModel.findOne({ user: req.user.id });

    if (!cart) {
      // create new cart if user doesn’t have one
      cart = new CartModel({
        user: req.user.id,
        items: [{ product: productId, quantity }]
      });
    } else {
      // check if product already exists in cart
      const item = cart.items.find(i => i.product.toString() === productId);

      if (item) {
        item.quantity += quantity; // increase qty
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//  Update product quantity in cart
export async function updateCartItem(req, res) {
  try {
    const { productId } = req.params; // product id from URL
    const { quantity } = req.body;

    let cart = await CartModel.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    item.quantity = quantity; // update qty
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//  Remove product from cart
export async function removeFromCart(req, res) {
  try {
    const { productId } = req.params;

    let cart = await CartModel.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { items: { product: productId } } },
      { new: true }
    );

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
