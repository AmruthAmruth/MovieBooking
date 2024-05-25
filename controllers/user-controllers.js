import User from "../models/User.js"
import bcrypt from 'bcrypt'

export const getAllUser=async(req,res)=>{
    let users;
    try{
        users = await User.find()
    }catch (err){
        return console.log(err);
    }
        if(!users){
            return res.json({message:"Unexpected Error"})
        }else{
            return res.json({users})
        }
}


export const signup = async (req,res)=>{
    const {name ,phone ,email ,password}=req.body;
    if(!name && name.trim()==="" && 
    !phone && phone.trim()==="" &&  
    !email && email.trim()==="" && 
     !password && password.trim()==="") {
        return res.json({message:"Invalid Inputs"})
     }
    const hashPassword = bcrypt.hashSync(password,10)
    let user;
    try{
        user =  new User({
            name,
            phone,
            email,
            password:hashPassword
        })
      user=await user.save()
    }catch(err){
        return console.log(err);
    }

    if(!user){
return res.json({message:"Unexpected Error"})
    }
    return res.json({user})
}


export const login = async (req,res)=>{
    const {email,password}=req.body
    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res.json({ message: "Invalid Inputs" });
      }
   
    let existingUser;
    try{
            existingUser = await User.findOne({email})
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
      }

    if(!existingUser){
        return res.json({message:"Check Your Email"})
    }else{
        const isPasswordCorrect= bcrypt.compareSync(password,existingUser.password)
        if(!isPasswordCorrect){
            return res.json({message :"Incorrect Password"})
        }else{
           return res.json({existingUser})
        }
    }

}

export const updateUser = async (req,res)=>{
    const id = req.params.id
    const {name,phone,email,password}=req.body
    if (!name.trim() || !phone || typeof phone !== 'number' || !email.trim() || !password.trim()) {
        return res.json({ message: "Invalid Inputs" });
    }

      let user;
      try{
                user = await User.findByIdAndUpdate(id,{
                                name,
                                phone,
                                email,
                                password
                },{ new: true })
      }catch(err){
        return console.log(err);
      }
      if(!user){
        return res.json({message:"Unexpected Error"})
      }else{
        return res.json({user})
      }
}


export const changePassword = async (req,res)=>{
    const id = req.params.id;
    const {oldPassword,newPassword}=req.body
    let user
    try {
         user = await User.findById(id);
        
    } catch (error) {
       
        console.error("Error occurred while finding user:", error);
    }
    let existingPassword 

    if (user) {
        if (oldPassword && user.password) {
            const existingPassword = bcrypt.compareSync(oldPassword, user.password);
            if (existingPassword) {
                const newHashedPassword = bcrypt.hashSync(newPassword, 10);
                user = await User.findByIdAndUpdate(id, { password: newHashedPassword });
                return res.json({ message: "Updated Success" });
            } else {
                return res.status(400).json({ message: "Incorrect old password" });
            }
        } else {
            return res.status(400).json({ message: "Missing password data" });
        }
    } else {
        return res.status(404).json({ message: "User not found" });
    }
    


} 


export const deleteAccout=async(req,res)=>{
    const id = req.params.id
    let user;
    try{
        user= await User.findByIdAndDelete(id)
    }catch(err){
      return console.log(err);
    }
    if(!user){
        return res.json({message:"Unexpected Error"})
    }
    return res.json({message:"Deleted Successfully"})

}

export const getUserById=async (req,res)=>{
    const id = req.params.id;
    let user
    try{
        user= await User.findById(id)
    }catch(err){
        return console.log(err);
    }
    if(!user){
        return res.json({message:"Unexpected Error"})
    }
    return res.json({user})
}