import express from 'express';
import {
  createOrder,
  getOrderHistory,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const orderRouter = express.Router();

// User routes (all require authentication)
orderRouter.post('/', requireAuth, createOrder);
orderRouter.get('/history', requireAuth, getOrderHistory);
orderRouter.get('/:orderId', requireAuth, getOrderById);
orderRouter.put('/:orderId/cancel', requireAuth, cancelOrder);

// Admin routes
orderRouter.get('/', requireAuth, getAllOrders);
orderRouter.put('/:orderId', requireAuth, updateOrderStatus);

export default orderRouter;
