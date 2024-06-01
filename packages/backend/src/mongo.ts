import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../../secrets.env') });
// connect to db mongo
async function connectmongoDb() {
    if(!process.env.MONGO_DB_URL){
        return 0;
    }else{
        return mongoose
    .connect(process.env.MONGO_DB_URL);
    }
    
}
export default connectmongoDb;