import bcrypt from 'bcrypt'



 const passwordHash = async (password) =>{
 
     try {
        
        const HashedPassword = await bcrypt.hash( password , 10);

        return HashedPassword

     } catch (error) {
        
        console.log(error)
     }

}


const matchPassword = async (password, hashPassword) =>{
   
    try {

        const ComparePassword =  await bcrypt.compare(password, hashPassword);

        return ComparePassword
        
    } catch (error) {
       console.log(error)
    }
     
}


export  {passwordHash, matchPassword}
