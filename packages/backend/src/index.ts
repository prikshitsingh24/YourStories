import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import login from './routes/user/login';
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

app.use('/user', login);

app.get('/', (req:any, res:any) => {
  res.send('This is YourStories Backend');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});