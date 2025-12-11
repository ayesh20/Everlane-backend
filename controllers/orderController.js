import Order from '../models/order.js';
import CartItem from '../models/cartItem.js';

// Create order from cart
export const createOrder = async (req, res) => {
    try {
        const { userId} = req.body;

        // Get all cart items for the user
        const cartItems = await CartItem.find({ userId });

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate total amount
        const totalAmount = cartItems.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
        );

        // Create order items array
        const orderItems = cartItems.map(item => ({
            productId: item.productId,
            title: item.title,
            price: item.price,
            qty: item.qty,
            img: item.img
        }));

        // Create new order
        const newOrder = new Order({
            userId,
            items: orderItems,
            totalAmount,
            shippingAddress,
            status: 'pending',
            paymentStatus: 'pending'
        });

        await newOrder.save();

        // Clear the cart after order is placed
        await CartItem.deleteMany({ userId });

        res.status(201).json({
            message: 'Order placed successfully',
            order: newOrder
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single order
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};