import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    title: String,
    price: Number,
    qty: {
        type: Number,
        default: 1,
        min: 1
    },
    img: String
}, { timestamps: true });

export default mongoose.model('CartItem', cartItemSchema);