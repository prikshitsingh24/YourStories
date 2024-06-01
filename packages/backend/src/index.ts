import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import router from './routes/user';
import connectmongoDb from './mongo';
import cookieParser from 'cookie-parser'; 
import cors from 'cors';
import storyTeller from './routes/storyTeller';


const app = express();

const port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// connection mongo db
connectmongoDb()



app.use('/api/user',router);
app.use('/api/storyteller',storyTeller)

app.get('/', (req:any, res:any) => {
  res.send('This is YourStories Backend');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});