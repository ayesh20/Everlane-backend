import express from 'express';
import {
    getCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} from '../controllers/cartController.js';

const cRouter = express.Router();

cRouter.get('/:userId', getCartItems);
cRouter.post('/add', addToCart);
cRouter.put('/update/:id', updateCartItem);
cRouter.delete('/remove/:id', removeFromCart);
cRouter.delete('/clear/:userId', clearCart);

export default cRouter;