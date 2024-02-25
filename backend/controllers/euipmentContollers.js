const equipment = require("../models/Equipment");
const User = require("../models/User");
const {medianUpload} = require("../services/mediaUpload")
exports.getListOfEquipment = async (req,res) =>{
    try{

        const equipmentList = await equipment.find({});

        return res.status(200).json({
            success:true,
            data:equipmentList,
            message:"Data fetch successfully..."
        })



    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Something wrong while fetching equipment data!!!"
        })
    }
}

exports.getListOfEquipmentUserWise = async (req,res) =>{
    try{

        const  userId  = req?.body?.user?.user?._id;
        const equipmentList = await equipment.find({owner:userId});

        return res.status(200).json({
            success:true,
            data:equipmentList,
            message:"Data fetch successfully..."
        })



    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Something wrong while fetching equipment data!!!"
        })
    }
}

exports.registerEquipment = async (req,res) =>{
   try{
    const {name,type,manufacturer,model,year,capacity,rate,feature,socketID} = JSON.parse(req.body.data);

    const image = req.files.image;
    const  userId  = req?.body?.user?.user?._id;

    if(!name || !type || !manufacturer || !model || !year || !rate || !socketID){
        return res.status(401).json({
            success:false,
            message:"Please fill required filled..."
        })
    }
    const cloudRes = await medianUpload(image);
    const newEquipment = await equipment.create({
        name,
        type,
        manufacturer,
        model,
        year,
        capacity,
        image:cloudRes?.secure_url,
        rate,
        owner:userId,
        feature
    })

    if(newEquipment){
            try{
                const allEqp = await equipment.find({});
                const user = await User.findOneAndUpdate({_id:userId},{
                    $push:{
                        equipments:newEquipment._id
                    }
                });
                const userEqu = await User.findById({_id:userId}).populate("equipments");
                io.emit("equipmentAdded",{allEqp});
                io.to(socketID).emit("equAddedForUser",{userEqu});
        

               

            }catch(err){
                const equID = newEquipment._id;
                await equipment.deleteOne({equID});
                return res.status(200).json({
                    success:false,
                    error:err.message,
                    message:"Failed to  add equipment in user"
                })
            }
    }

    return res.status(200).json({
        success:true,
        message:"Equipment added successfully..."
    })

   }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong while creating Equipment..."
        })
   }

    

}

exports.nearByEquipmentSuggestionAlgorithm = async (req,res) =>{
    try{
        // const userLatitude = req?.body?.user?.latitude;
        // const userLongitude =req?.body?.user?.longitude;

        const allEquipment = await equipment.find({}).populate("owner").exec().map((equ)=> {
            return {
                lat:equ?.owner?.latitude,
                long:equ?.owner?.longitude,
                equID:equ?._id
            }
        } );;
        // const coordinate = await allEquipment.map((equ)=> {
        //     return {
        //         lat:equ?.owner?.latitude,
        //         long:equ?.owner?.longitude,
        //         equID:equ?._id
        //     }
        // } );

        console.log(allEquipment);

        
     return res.status(200).json({
        success:true,
     })

    }catch(err){
        return res.status(500).json({
            success:false,
            err:err.message,
            message:"Internal server error"
        })
    }
}

exports.deleteEquipment = async (req,res) =>{
   const {equID,socketID} = req.body;
   const userID = req.body.user?.user?._id;
   try{
        if(!equID || !socketID){
            return res.status(404).json({
                success:false,
                message:"Provide Require data"
            })
        }
        // const result = true;
        const result = await equipment.findOneAndDelete({_id:equID});
        // console.log(result)
        const allEqp = await equipment.find({});
        const userEqu = await User.findById({_id:userID}).populate("equipments");
        if(result){
            io.to(socketID).emit("equipmentDeleted",{userEqu});
            io.emit("equipmentDeletedToAll",{allEqp});
            return res.status(200).json({
                success:true,
                message:"Equipment Deleted Successfully"
            })
        }else{
          throw new Error("Failed to Delete")
       }
       
   }catch(err){
    return res.status(500).json({
        success:false,
        error:err.message,
        message:"Internal server error"
    })
   }
}