
import User from '../models/user.model.js'
import {passwordHash, matchPassword} from '../utils/password.utils.js'
import jwt from 'jsonwebtoken'




const userControllers = async (req, res) =>{

   try {
      
      const {name, email, phone , password , answer} = req.body;

       const  matchUser  = await User.findOne({email})

       if (matchUser) {
         
         return res.status(300).send("user all ready exist")
       }

       const HashPassword = await passwordHash(password);

       const userData = await new User({name , email , phone , password:HashPassword , answer}).save()

       res.status(200).send({
         success:true,
         message: "user created successfully",
         userData
       })
   } catch (error) {
      
      res.status(400).send({
         success:false,
         message:"In valid details",
         error
      })
   }


}


const loginControllers = async (req,res) => {
   try {

      const {email, password} = req.body;

      if(!email)
      {
         return  res.status(300).send({
          success:false,
          message:"please Register first",
       })
      
      }
       
 
       const user = await User.findOne({email})
       
       if(!user)
       {
          return res.status(404).send({
             success:false,
             message:"user not found",
             user
          })
       }
         
       const match = await matchPassword(password, user.password)
            
       if(!match)
       {
          return res.status(305).send({
             success:false,
             message:"In Valid user details"
          })
       }
           
       const token = await jwt.sign({_id:user._id}, process.env.JWT_TOKEN , {expiresIn:"3d"})
 
        res.status(200).send({
          success:true,
          message:"user login Successfully",
          user:{
          name :user.name,
          email:user.email,
          phone:user.phone,
          role:user.role,
          },
          token
        })
 
      
   } catch (error) {
      res.status(400).send(
         {
            success:false,
            message:"Internal server error",
            error
         }
      )
   }
}
 
const  forgotPasswordControllers = async (req,res) => {
    
   try {
      
     const {email , newPassword, answer} = req.body

     if(!email) 
     {
       return res.status(400).send({
         message:'email Required'
        })
     }
     if(!answer) 
     {
         return res.status(400).send({
         message:'Answer is required'
        })
     }


     const user  = await User.findOne({email , answer})
     if(!user)
     {
       return res.status(402).send({
         message:"user not found"
       })
     }

     const hash = await passwordHash(newPassword);
     await User.findByIdAndUpdate(user._id, { password:hash});

     res.status(200).send({
      success:true,
      message:"password reset Successfully"
     })

   } catch (error) {
      res.status(400).send(
         {
            success:false,
            message:"Internal server error",
            error
         }
      )
   }

}








export {
   userControllers,
   loginControllers,
   forgotPasswordControllers
}