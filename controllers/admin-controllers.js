import Admin from "../models/Admin.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const addAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name && name.trim() === "" &&
        !email && email.trim() === "" &&
        !password && password.trim() === "") {
        return res.json({ message: "Invalid Inputs" })
    }
    const hashPassword = bcrypt.hashSync(password, 10)
    let admin;
    try {
        admin = new Admin({
            name,
            email,
            password: hashPassword
        })
        admin = await admin.save()
    } catch (err) {
        return console.log(err);
    }

    if (!admin) {
        return res.json({ message: "Unexpected Error" })
    }
    return res.json({ admin })
};




export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res.json({ message: "Invalid Inputs" });
    }

    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }

    if (!existingAdmin) {
        return res.json({ message: "Check Your Email" })
    } else {
        const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password)
        if (!isPasswordCorrect) {
            return res.json({ message: "Incorrect Password" })
        } else {
            const token = jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{
                expiresIn:"7d"
            })
               
            return res.json({ message:"Authentication Completed ",token,id:existingAdmin._id })
        }
    }

}


export const getAdminById=async (req,res)=>{
    const id = req.params.id;
    let admin
    try{
        admin= await Admin.findById(id)
    }catch(err){
        return console.log(err);
    }
    if(!admin){
        return res.json({message:"Unexpected Error"})
    }
    return res.json({admin})
}