import CartItem from '../models/cartItem.js';

// Get all cart items for a user
export const getCartItems = async (req, res) => {
    try {
        const { userId } = req.params;
        const cartItems = await CartItem.find({ userId });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const { userId, productId, title, price, qty, img } = req.body;

        // Check if item already exists in cart
        const existingItem = await CartItem.findOne({ userId, productId });

        if (existingItem) {
            existingItem.qty += qty || 1;
            await existingItem.save();
            return res.status(200).json(existingItem);
        }

        const newCartItem = new CartItem({
            userId,
            productId,
            title,
            price,
            qty: qty || 1,
            img
        });

        await newCartItem.save();
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { qty } = req.body;

        const updatedItem = await CartItem.findByIdAndUpdate(
            id,
            { qty },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await CartItem.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear entire cart for a user
export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        await CartItem.deleteMany({ userId });
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};