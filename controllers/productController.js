import Product from "../models/productModel.js";

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }else

    res.json(product);
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
