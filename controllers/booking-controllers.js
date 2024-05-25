import Razorpay from "razorpay";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import crypto from 'crypto'
export const createBooking = async (req, res) => {
    const { seatNumber, amount, movieName, userId, options } = req.body;
    console.log(options);
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });

        // Create order using Razorpay API
        const order = await razorpay.orders.create(options);

        if (!order) {
            // If order creation fails, return an error response
            return res.status(500).json({ message: "Error creating order" });
        }

        // Save booking details to the database
        const newBooking = new Booking({
            seatNumber,
            amount,
            movieName,
            userId
        });

        const savedBooking = await newBooking.save();

        // Update user's bookings
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $push: { bookings: savedBooking._id }
        }, { new: true });

        console.log('Updated user:', updatedUser);
        console.log("Successful booking:", savedBooking);

        // Return success response to the client
        res.json({ message: "Booking successful", booking: savedBooking, order });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};


export const validatePayment = (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        return res.status(400).json({ message: "Invalid request, missing required fields" });
    }

    const secret = process.env.RAZORPAY_SECRET;
    if (!secret) {
        return res.status(500).json({ message: "Internal server error, missing Razorpay secret" });
    }

    const sha = crypto.createHmac("sha256", secret);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
        return res.status(400).json({ message: "Transaction is not completed" });
    }

    res.json({
        message: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
    });
};

export const getbookingById=async(req,res)=>{
    const id = req.params.id;
    let booking;
    try{
            booking=await Booking.findById(id)
    }catch(err){
        return console.log(err);
    }
    if(!booking){
        return res.json({message:":Unexpected Error"})
    }
    return res.json({booking})
}


export const getAllBookings=async(req,res)=>{
    let bookings;
    try{ 
        bookings = await Booking.find()
    }catch (err){
        return console.log(err);
    }
        if(!bookings){
            return res.json({message:"Unexpected Error"})
        }else{
            return res.json({bookings}) 
        }
}


export const getBookingByMovieName = async (req, res) => {
   
    let data;
    try {
        // Find bookings where movieName matches the provided value
        data = await Booking.find({ movieName: req.params.moviename });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
    if (data && data.length > 0) {
        return res.json({ data });
    }
    return res.json({ message: "No booking found for the specified movie name" });
}