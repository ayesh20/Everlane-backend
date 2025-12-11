import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from '../models/order.js';
import User from '../models/user.js';

dotenv.config();

const sampleOrders = [
  {
    items: [
      {
        productId: new mongoose.Types.ObjectId(),
        title: "Classic White T-Shirt",
        price: 2800,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
      },
      {
        productId: new mongoose.Types.ObjectId(),
        title: "Slim Fit Jeans",
        price: 5500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=500"
      }
    ],
    total: 11100,
    status: 'DELIVERED',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    shippingAddress: {
      name: 'Test User',
      address: '123 Main Street',
      city: 'Colombo',
      postalCode: '10100',
      phone: '0777187147'
    }
  },
  {
    items: [
      {
        productId: new mongoose.Types.ObjectId(),
        title: "Relaxed Cardigan",
        price: 4500,
        quantity: 1,
        image: "https://i.pinimg.com/236x/a2/cc/5e/a2cc5e37c05850f595981158dde3379f.jpg"
      }
    ],
    total: 4500,
    status: 'SHIPPED',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    shippingAddress: {
      name: 'Test User',
      address: '123 Main Street',
      city: 'Colombo',
      postalCode: '10100',
      phone: '0777187147'
    }
  },
  {
    items: [
      {
        productId: new mongoose.Types.ObjectId(),
        title: "Premium Leather Jacket",
        price: 15000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
      },
      {
        productId: new mongoose.Types.ObjectId(),
        title: "Cotton Polo Shirt",
        price: 3200,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1625910513413-5fc34e777dd7?w=500"
      }
    ],
    total: 21400,
    status: 'PROCESSING',
    paymentMethod: 'paypal',
    paymentStatus: 'paid',
    shippingAddress: {
      name: 'Test User',
      address: '123 Main Street',
      city: 'Colombo',
      postalCode: '10100',
      phone: '0777187147'
    }
  },
  {
    items: [
      {
        productId: new mongoose.Types.ObjectId(),
        title: "Summer Dress",
        price: 6800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"
      }
    ],
    total: 6800,
    status: 'PENDING',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    shippingAddress: {
      name: 'Test User',
      address: '123 Main Street',
      city: 'Colombo',
      postalCode: '10100',
      phone: '0777187147'
    }
  },
  {
    items: [
      {
        productId: new mongoose.Types.ObjectId(),
        title: "Wool Sweater",
        price: 5200,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"
      }
    ],
    total: 5200,
    status: 'CANCELLED',
    paymentMethod: 'card',
    paymentStatus: 'failed',
    shippingAddress: {
      name: 'Test User',
      address: '123 Main Street',
      city: 'Colombo',
      postalCode: '10100',
      phone: '0777187147'
    }
  }
];

async function seedOrders() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find the test user
    const user = await User.findOne({ email: 'test@example.com' });

    if (!user) {
      console.log('Test user not found. Please register a user first.');
      process.exit(1);
    }

    console.log(`Found user: ${user.name} (${user.email})`);

    // Clear existing orders for this user
    await Order.deleteMany({ userId: user._id });
    console.log('Cleared existing orders for user');

    // Create orders with different dates
    const orders = [];
    const now = new Date();

    for (let i = 0; i < sampleOrders.length; i++) {
      const orderDate = new Date(now);
      orderDate.setDate(orderDate.getDate() - (i * 5)); // Each order 5 days apart

      orders.push({
        ...sampleOrders[i],
        userId: user._id,
        createdAt: orderDate,
        updatedAt: orderDate
      });
    }

    await Order.insertMany(orders);
    console.log(`Successfully seeded ${orders.length} orders`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding orders:', error);
    process.exit(1);
  }
}

seedOrders();
