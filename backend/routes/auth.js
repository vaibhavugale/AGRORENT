const router = require("express").Router();
const {signIn,signUp, logout} = require("../controllers/Auth");
const { getListOfEquipment } = require("../controllers/euipmentContollers.js");
const {sendMessage} = require("../services/whatsappService.js");




router.post("/login",signIn);
router.get("/getList",getListOfEquipment);
router.post("/signup",signUp);
router.post("/logout",logout);
module.exports = router