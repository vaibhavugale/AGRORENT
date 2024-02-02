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

exports.registerEquipment = async (req,res) =>{
   try{
    const {name,type,manufacturer,model,year,capacity,rate,feature} = JSON.parse(req.body.data);

    const image = req.files.image;
    const {_id} = req.body.user;

    if(!name || !type || !manufacturer || !model || !year || !rate){
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
        owner:_id,
        feature
    })

    if(newEquipment){
            try{
                await User.updateOne({_id},{
                    $push:{
                        equipments:newEquipment._id
                    }
                })
        
               

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