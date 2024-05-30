const { registerEquipment, nearByEquipmentSuggestionAlgorithm, getListOfEquipmentUserWise, deleteEquipment, getListOfEquipment, unBookEquipment } = require("../controllers/euipmentContollers");


const router = require("express").Router();

router.post("/user-equipment",getListOfEquipmentUserWise)
router.post("/registerEquipment",registerEquipment);
router.post("/getSuggestedEquipment",nearByEquipmentSuggestionAlgorithm)
router.post("/delete-equipment",deleteEquipment)
router.post("/unbook-equipment",unBookEquipment)



module.exports = router;