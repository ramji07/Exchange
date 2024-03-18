import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
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
      CompanyName:{
        type: String,
        required: false
      },
      Country:{
        type: String,
        required: false
      },
    
})


const ContactModel = mongoose.model('Contact', ContactSchema)

export default ContactModel