import express, { Router,Request, Response } from 'express';
import storyTeller from '../controllers/storyteller'

const router = Router();

// add user 
router.post('/start', storyTeller.start);
router.post('/yourstory',storyTeller.yourStory);


export default router;