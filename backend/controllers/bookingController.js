const Equipment = require("../models/Equipment");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { sendMessage } = require("../services/whatsappService.js");
exports.sendBookRequest = async (req,res)=>{
   try{

    const {eupID} = req.body;
    const userId = req?.body?.user?.user?._id;

    if(!eupID){
        return res.status(404).json({
            success:false,
            message:"Please Provide Require field.."
        })
    }

    const eupData = await Equipment.findOne({ _id: eupID }).populate('owner', 'phoneNumber');
    if (!eupData) {
        return res.status(404).json({
            success: false,
            message: "Equipment not found"
        });
    }

    // token generation 
    const ownerPhoneNumber = eupData.owner.phoneNumber;
    const token = await jwt.sign({
        eupID: eupID,
        customerId: userId
    }, process.env.JWT_SECRET, {
        expiresIn: "5m",
    });
     
    const message = `
     You new request for rent , Please click below link to accept
     http://localhost:3000/accept-bookRequest/${token}.
    `;

    // const resByVonage = await sendMessage(message,ownerPhoneNumber); 

    return res.status(200).json({
        success:true,
        message:"Request send successfully..."
    })
   }catch(err){
    return res.status(500).json({
        success:true,
        error:err.message,
        message:"Internal server error"
    })
   }
}