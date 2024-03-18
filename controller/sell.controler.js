import SellModel from "../models/sell.model.js";


const SellController = async (req,res) => {
    try {
        const {Fname,Lname, email , phone , companyName,price,NumberOfShare}  = req.body
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
        if(!companyName)
        {
             res.status(302).send({
                success:false,
                message:'please Enter company Name '
             })
        }
        if(!price)
        {
             res.status(302).send({
                success:false,
                message:'please Enter ask price '
             })
        }
        if(!NumberOfShare)
        {
             res.status(302).send({
                success:false,
                message:'please Enter NumberOfShare'
             })
        }


        const Sell_Share_data = await SellModel({Fname, Lname, email , phone , companyName, price, NumberOfShare}).save()

        if(!Sell_Share_data)
        {
            res.status(400).send({
                success:false,
                message:'Something went gone wrong to server'
            })
        }
        
        res.status(200).send({
            success:true,
            message:'Selling Request Successfully Send'
        })

    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Internal Server Error'
        })
    }
}

const SellData = async (req, res) => {
    try {
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 8;
  
      const skip = (page - 1) * limit;
      const total = await SellModel.countDocuments();
      
      const data = await SellModel.find().skip(skip).limit(limit);
  
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

  const sellDelete =  async (req,res) => {
    try {
      const deletedItem = await SellModel.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
export {SellController , SellData , sellDelete}