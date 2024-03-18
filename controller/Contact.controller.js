
import ContactModel from "../models/contact.model.js";

const ContactController =  async (req,res) => {
    try {
        const {Fname,Lname, email , phone , CompanyName,Country}  = req.body;
     
        if(!(Fname && Lname))
        {
             res.status(300).send({
                success:false,
                message:'please Enter your First && Last Name'
             })
        }
        if(!email)
        {
             res.status(301).send({
                success:false,
                message:'please Enter your Business Mail'
             })
        }
        if(!phone)
        {
             res.status(302).send({
                success:false,
                message:'please Enter your Phone Number'
             })
        }
        if(!CompanyName)
        {
             res.status(302).send({
                success:false,
                message:'please Enter company Name '
             })
        }
        const Contact_Data = await ContactModel({Fname, Lname, email , phone , CompanyName, Country}).save()

        if(!Contact_Data)
        {
            res.status(400).send({
                success:false,
                message:'Something went gone wrong to server'
            })
        }

        res.status(200).send({
            success:true,
            message:'thanks for Contact Us. We Reply within 1 Days.'
        })


    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Something went gone wrong to server'
        })
    }
}


const ContactData = async (req, res) => {
    try {
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 8;
  
      const skip = (page - 1) * limit;
      const total = await ContactModel.countDocuments();
      
      const data = await ContactModel.find().skip(skip).limit(limit);
  
      res.status(200).json({
        data,
        currentPage: page,
        totalPages: Math.ceil(total / limit)
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  const ContactDelete = async (req,res) =>  {
    try {
      const deletedItem = await ContactModel.findByIdAndDelete(req.params.id);

      
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

export {ContactController,ContactData ,ContactDelete}