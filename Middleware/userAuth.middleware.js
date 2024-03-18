import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const requiredSign =  async (req,res , next) => {
   try {

    const matchToken = await jwt.verify(
        req.headers.authorization,
          process.env.JWT_TOKEN
    )

    req.user = matchToken
    next()
    
   } catch (error) {
     
    res.status(400).send({
        success:false,
        message:"Invalid user",
    })
   }
}


const isAdmin = async (req,res, next) => {
    
    try {
       
        const AdminCheck = await User.findById(req.user._id);
        if(AdminCheck !== true)
        {
            res.status(300).send({
                success:false,
                message:"unAuthorized Access"
            })
        }else{

            next()
        }
    } catch (error) {
        
        res.status(400).send({
            success:false,
            message:"Invalid User admin"
        })

    }
} 



export { 
    requiredSign,
    isAdmin
}