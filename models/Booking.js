import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    seatNumber:{
        type:[String],
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    movieName:{
        type:String,
        require:true,
    },
    userId:{
        type:String,
        require:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

export default mongoose.model("Booking",bookingSchema)