import express, { Router,Request, Response } from 'express';

const router = Router();

router.post('/login',(req:Request,res:Response)=>{
    res.send("welcome"+ req.body.username);
});

router.post('/signUp', (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    if (!password || password.trim() === "") {
      return res.status(400).send('Password was not given');
    }
  
    res.status(201).send(`Welcome new user ${username}. Your password is ${password}`);
  });


export default router;