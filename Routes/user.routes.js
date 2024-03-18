import  express  from "express";
import {userControllers , loginControllers ,  forgotPasswordControllers} from '../controller/user.controller.js'
import {isAdmin, requiredSign} from '../Middleware/userAuth.middleware.js'
import { buyController , BuyData ,BuyDelete } from "../controller/buy.Controller.js";
import { SellController , SellData , sellDelete} from "../controller/sell.controler.js";
import {ContactController , ContactData, ContactDelete}  from '../controller/Contact.controller.js'


const router = express.Router()


router.post('/Register',userControllers);
router.post('/buy-share-data', buyController)
router.post('/sell-share-data',SellController)
router.post('/contact-data',ContactController)
router.post('/login', loginControllers);
router.post('/forgot-password',   forgotPasswordControllers);
router.get('/user',requiredSign , (req,res) => {
    res.status(200).send({
        ok:true
    })
} )
router.get('/admin',requiredSign , isAdmin, (req,res) => {
    res.status(200).send({
        ok:true
    })
} )

router.get('/contact-data' , ContactData)
router.get('/buy-data' ,BuyData)
router.get('/sell-data',SellData)


router.delete('/contact-data/:id' , ContactDelete)
router.delete('/buy-data/:id',BuyDelete)
router.delete('/sell-data/:id',sellDelete)





export default router