import mongoose from "mongoose";

// connect to db mongo
async function connectmongoDb() {
    return mongoose
    .connect("mongodb://127.0.0.1:27017/YourStories");
    
}
export default connectmongoDb;