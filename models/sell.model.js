import mongoose from "mongoose";

const SellShareSchema = new mongoose.Schema({
    Fname:{
        type: String,
        required: true
      },
    Lname:{
        type: String,
        required: true
      },
      email:{
        type: String,
        required: true
      },
      phone:{
        type: Number,
        required: true
      },
      companyName:{
        type: String,
        required: true
      },
      price:{
        type: String,
        required: true
      },
      NumberOfShare:{
        type: Number,
        required: true
      },
})


const SellModel = mongoose.model('SellShare', SellShareSchema)

export default SellModel