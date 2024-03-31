const Equipment = require("../models/Equipment");
const User = require("../models/User");
const History = require("../models/History.js")
const jwt = require("jsonwebtoken");
const { sendSMS } = require("../services/whatsappService.js");
exports.sendBookRequest = async (req,res)=>{
   try{

    const {eupID,address,hour} = req.body;
    const userId = req?.body?.user?.user?._id;
    if(!eupID || !address || !hour){
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
    const ownerPhoneNumber = eupData?.owner?.phoneNumber;
    const token = await jwt.sign({
        eupID: eupID,
        customerId: userId,
    }, process.env.JWT_SECRET, {
        expiresIn: "5m",
    });
     
    const message = `





     You have  new request for rent ,
     Address: ${address},
     Rental Hour : ${hour}
     Equipment Name : ${eupData?.name}
     Equipment ID: ${eupData?._id}
     
     Please click below link to accept.
     This is valid for 5 minuet.



     http://localhost:3000/accept-bookRequest/${token}.
    `;

    const resByTwilio =  sendSMS(message,ownerPhoneNumber); 
    // console.log(message);

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

exports.acceptRequest = async (req,res)=>{
    try{
        const token = req.params.id;
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const eupID = decode?.eupID;
        const cusId = decode?.customerId;

       const eup  = await Equipment.findOneAndUpdate({_id:eupID},{available:false}).populate('owner');
       const history = await History.create({
        customerID:cusId,
        eupId:eupID,
       })
       const user =  await User.findOneAndUpdate({_id:cusId},{
        $push:{
            history:history?._id
        }
    })

        const ownerPhoneNumber = eup?.owner?.phoneNumber;
        const customerPhoneNumber = user?.phoneNumber;

        const eupOwnerMessage = `
            Find customer detail below


            Name:${user?.firstName+" "+user?.lastName},
            PhoneNumber:${user?.phoneNumber},
            

            Thank you for using agrorent services. Have a great day.
        `
        const customerMessage = `

            Find your order  detail below.


            EquipmentName:${eup?.name},
            OwnerName:${eup?.owner?.firstName+" "+eup?.owner?.lastName},
            PhoneNumber:${eup?.owner?.phoneNumber}
            

            Thank you for using agrorent services. Have a great day.
        `
        const resByTwilioEup =  sendSMS(eupOwnerMessage,ownerPhoneNumber); 
        const resByTwilioCus =  sendSMS(customerMessage,customerPhoneNumber); 
        const allEqp = await equipment.find({});
        io.emit("equipmentAdded",{allEqp});
        return res.status(200).json({
            success:true,
            message:"Request Accepted"
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Internal server Error"
        })
    }
}
exports.rejectRequest = async (req,res)=>{
    try{

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
}