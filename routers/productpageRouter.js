import express from 'express';
import { getAllProducts } from '../controllers/productpageController.js'; 

const router = express.Router();

router.get('/', getAllProducts); 

export default router;