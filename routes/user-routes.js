import express from "express";
import { changePassword, deleteAccout, getAllUser, getUserById, login, signup, updateUser } from "../controllers/user-controllers.js";

const userRouter = express.Router()  
userRouter.post('/',signup) 
userRouter.post('/login',login) 
userRouter.get('/',getAllUser)   
userRouter.get('/:id',getUserById)
userRouter.put('/:id',updateUser)
userRouter.delete('/:id',deleteAccout) 
userRouter.put('/changepassword/:id',changePassword)

export default userRouter 