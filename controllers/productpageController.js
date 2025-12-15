import Product from '../models/product.js'; 
import mongoose from 'mongoose'; 

export const getAllProducts = async (req, res) => {
    try {
       
        const { keyword, category } = req.query;
        const query = {};

        if (keyword) {
            
            query.title = { 
                $regex: keyword,
                $options: 'i'    
            };
        }

        
        if (category && category !== 'all' && category !== 'null') {
           
            query.category = category; 
        }

      
        const products = await Product.find(query); 

       
        res.status(200).json(products); 

    } catch (error) {
        console.error("Error fetching products:", error);
        
        
        if (error instanceof mongoose.Error.CastError) {
             return res.status(400).json({ 
                 message: "Invalid data format provided." 
             });
        }

        res.status(500).json({ 
            message: 'Products fetch failed due to a server error.',
            error: error.message 
        });
    }
};