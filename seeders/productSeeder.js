import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/product.js';

dotenv.config();

const products = [
  {
    productId: "PROD001",
    name: "Classic White T-Shirt",
    title: "Classic White T-Shirt",
    altNames: ["White Tee", "Basic White"],
    labelledPrice: 3500,
    price: 2800,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"],
    description: "A timeless classic white t-shirt made from 100% organic cotton. Perfect for everyday wear.",
    stock: 100,
    isAvailable: true,
    category: "tees",
    ratings: 4,
    reviews: "4.5 stars"
  },
  {
    productId: "PROD002",
    name: "Slim Fit Denim Jeans",
    title: "Slim Fit Denim Jeans",
    altNames: ["Blue Jeans", "Denim Pants"],
    labelledPrice: 8500,
    price: 6800,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"],
    description: "Premium slim fit denim jeans with a modern cut. Comfortable stretch fabric for all-day wear.",
    stock: 75,
    isAvailable: true,
    category: "pants",
    ratings: 5,
    reviews: "4.7 stars"
  },
  {
    productId: "PROD003",
    name: "Wool Blend Sweater",
    title: "Wool Blend Sweater",
    altNames: ["Knit Sweater", "Winter Sweater"],
    labelledPrice: 12000,
    price: 9500,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
    images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500"],
    description: "Luxuriously soft wool blend sweater. Perfect for cooler weather with a relaxed fit.",
    stock: 50,
    isAvailable: true,
    category: "sweaters",
    ratings: 5,
    reviews: "4.8 stars"
  },
  {
    productId: "PROD004",
    name: "Leather Jacket",
    title: "Leather Jacket",
    altNames: ["Biker Jacket", "Moto Jacket"],
    labelledPrice: 25000,
    price: 19500,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"],
    description: "Classic leather jacket with a timeless design. Genuine leather with satin lining.",
    stock: 30,
    isAvailable: true,
    category: "jacket",
    ratings: 5,
    reviews: "4.9 stars"
  },
  {
    productId: "PROD005",
    name: "Oxford Button-Down Shirt",
    title: "Oxford Button-Down Shirt",
    altNames: ["Dress Shirt", "Formal Shirt"],
    labelledPrice: 6500,
    price: 5200,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"],
    description: "Classic oxford button-down shirt. Perfect for both casual and semi-formal occasions.",
    stock: 80,
    isAvailable: true,
    category: "shirts",
    ratings: 4,
    reviews: "4.6 stars"
  },
  {
    productId: "PROD006",
    name: "Graphic Print Tee",
    title: "Graphic Print Tee",
    altNames: ["Printed T-Shirt", "Art Tee"],
    labelledPrice: 4000,
    price: 3200,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500",
    images: ["https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500"],
    description: "Trendy graphic print t-shirt with unique artistic design. Made from soft cotton blend.",
    stock: 120,
    isAvailable: true,
    category: "tees",
    ratings: 4,
    reviews: "4.4 stars"
  },
  {
    productId: "PROD007",
    name: "Chino Pants",
    title: "Chino Pants",
    altNames: ["Khaki Pants", "Casual Pants"],
    labelledPrice: 7000,
    price: 5500,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500",
    images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500"],
    description: "Versatile chino pants with a slim fit. Perfect for office or weekend wear.",
    stock: 90,
    isAvailable: true,
    category: "pants",
    ratings: 4,
    reviews: "4.5 stars"
  },
  {
    productId: "PROD008",
    name: "Cashmere Cardigan",
    title: "Cashmere Cardigan",
    altNames: ["Knit Cardigan", "Layering Piece"],
    labelledPrice: 18000,
    price: 14500,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500",
    images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500"],
    description: "Ultra-soft cashmere cardigan. Lightweight yet warm, perfect for layering.",
    stock: 40,
    isAvailable: true,
    category: "sweaters",
    ratings: 5,
    reviews: "4.9 stars"
  },
  {
    productId: "PROD009",
    name: "Denim Jacket",
    title: "Denim Jacket",
    altNames: ["Jean Jacket", "Trucker Jacket"],
    labelledPrice: 11000,
    price: 8800,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500",
    images: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500"],
    description: "Classic denim jacket with vintage wash. A wardrobe essential for any season.",
    stock: 60,
    isAvailable: true,
    category: "jacket",
    ratings: 5,
    reviews: "4.7 stars"
  },
  {
    productId: "PROD010",
    name: "Linen Summer Shirt",
    title: "Linen Summer Shirt",
    altNames: ["Beach Shirt", "Casual Linen"],
    labelledPrice: 5500,
    price: 4400,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500",
    images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500"],
    description: "Breathable linen shirt perfect for summer. Relaxed fit with a laid-back vibe.",
    stock: 70,
    isAvailable: true,
    category: "shirts",
    ratings: 4,
    reviews: "4.6 stars"
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Successfully seeded 10 products');

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedProducts();
