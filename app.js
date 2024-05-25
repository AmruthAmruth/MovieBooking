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
mongoose
.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.f2sao74.mongodb.net/`)
.then(()=>{
    app.listen(5000,()=>console.log("Connected to DataBase And Server"))
})
.catch((err)=>console.log(err))


