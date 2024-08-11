import express, { Router,Request, Response } from 'express';
import User from '../models/user'
import auth from '../service/auth';

async function handleAdduser(req:Request,res:Response) {
    

    const { first_Name, last_Name, user_Email, user_Password } = req.body;
  console.log("first name ",first_Name);
  if (!first_Name || !last_Name || !user_Email || !user_Password) {
    return res.status(400).json({ message: 'All fields (first_Name, last_Name, user_Email, user_Password) are required.' });
  }
  const isUserEmail= await User.findOne({ email: user_Email });
  console.log("isuseremail=",isUserEmail);
  if(isUserEmail){

    return res.status(409).json({message:"Same user email found try login"})
    
  }
  try {
    // Save user to database here
    const result = await User.create({
      firstName: first_Name,
      lastName: last_Name,
      email: user_Email,
      password: user_Password,
    });
    console.log('result', result);
    return res.status(201).json({ message: "Success "+"user id :"+result.id });
  } catch (error) {
    console.error('Error saving user', error);

    
  }
}
// login user 

async function handleLogInUser(req:Request,res:Response){
    const {user_Email,user_Password}=req.body;

    const user=await User.findOne({email:user_Email,password:user_Password});
    if(!user){
        return res.status(404).json({ error: "Invalid credetial "+"user email or password wrong " });
    }
    
    const token=auth.setUser(user);
    res.cookie("uid",token);
    return res.status(201).json({ message: "Login successful",
      sessionId: token,
      userId: user._id,});
}

async function handleDeletUserById(req:Request,res:Response){

    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"success"});
}
async function handleGetUserById(req:Request,res:Response){

    const user = await User.findById(req.params.id);
    const body = req.body;
    if(!user){
        return res.status(404).json({ error: 'User not found! .' });
    }
    
  
    
    return res.json(user);
}
export default{
    handleAdduser,
    handleDeletUserById,
    handleGetUserById,
    handleLogInUser
};