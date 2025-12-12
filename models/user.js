import mongoose from "mongoose"

const userSchema = new mongoose.Schema({


    fullName: {
        type: String,
        required: true,
    },

     email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please provide a valid email address"
        ]
    },

     password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },

    
})

const User = mongoose.model("User", userSchema);

export default User;