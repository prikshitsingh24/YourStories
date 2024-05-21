import express, { Router,Request, Response } from 'express';
import user from '../controllers/user'

const router = Router();

// add user 
router.post('/signUp', user.handleAdduser);
// login user 
router.post('/logIn', user.handleLogInUser);
// delet user by id 
router.delete('/:id', user.handleDeletUserById);
// get user by id 
router.get('/:id', user.handleGetUserById);

export default router;