import mongoose from "mongoose";
// mongo schema
const userSchema=new mongoose.Schema(
    {
      firstName:{
        type:String,
        require:true,
  
      },
      lastName:{
        type:String,
        require:true,
        
      },
      email:{
        type:String,
        require:true,
        unique:true,
        
      },
      password:{
        type:String,
        
        
      },
    },
    {timestamps:true}
  );
  //  mongo model
  const User = mongoose.model("user",userSchema);

  export default User;