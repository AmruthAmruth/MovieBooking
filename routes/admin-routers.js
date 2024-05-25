import express from 'express'
import { addAdmin, getAdminById, login } from '../controllers/admin-controllers.js'

const adminRouter = express.Router()

adminRouter.post('/',addAdmin)
adminRouter.post('/login',login)
adminRouter.get('/:id',getAdminById)
export default adminRouter  