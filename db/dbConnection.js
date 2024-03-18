import mongoose  from "mongoose";


const connectDB = async () =>{
 try {
     
    const con = await mongoose.connect(process.env.DB_URI)
    console.log(`connected to mongodb`)
 } catch (error) {
    console.log('connection is not success')
 }
}






  export default connectDB