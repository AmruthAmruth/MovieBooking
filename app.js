import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/user-routes.js'
import adminRouter from './routes/admin-routers.js'
import movieRouter from './routes/movie-routers.js'
import bookingRouter from './routes/booking-routes.js'
const app=express()
dotenv.config() 
app.use(express.json())
app.use(cors())
app.use('/user',userRouter)
app.use('/admin',adminRouter) 
app.use('/movie',movieRouter)
app.use('/booking',bookingRouter) 



const PORT = process.env.PORT || 5000;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_URI = `mongodb+srv://admin:${MONGODB_PASSWORD}@cluster0.f2sao74.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to Database and Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });