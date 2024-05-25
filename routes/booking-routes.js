import express from 'express'
import {  createBooking, getAllBookings, getbookingById, getBookingByMovieName, validatePayment } from '../controllers/booking-controllers.js'
const bookingRouter = express.Router()

bookingRouter.post('/',createBooking)
bookingRouter.post('/validate',validatePayment)
bookingRouter.get('/:id',getbookingById)
bookingRouter.get('/',getAllBookings)
bookingRouter.get('/movie/:moviename',getBookingByMovieName)

export default bookingRouter     