const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "ingrese tu nombre"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
    
    },
    {
        timestamps: true
    }
)
