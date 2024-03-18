import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
   name:{
     type: String,
     required: true
   },
   email:{
     type: String,
     required: true
   },
   phone:{
     type: String,
     required: true
   },
   password:{
      type:String,
      required:true
   },
   answer:{
      type:String,
      required:true
   },

   role:{
    type:Boolean,
    default:true
   }
},{timestamps:true})

const User = mongoose.model('user', UserSchema)


export default User