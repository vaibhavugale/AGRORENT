const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signIn = async (req, res) => {
  try {
    // get userId and password
    const { username, password } = req.body;
    // validate details
    if (!username || !password) {
      return res.status(401).json({
        success: false,
        message: "All filed required...",
      });
    }
    // if user found return user
    const user = await User.findOne({ username }).populate("equipments");
    // if not return response

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!!!",
      });
    }
    const result = await bcrypt.compare(password, user?.password);

    if (result) {
      const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        path:"/",
        sameSite:'None',
        overwrite:true

      };
      await res.cookie("token", token, options)
      return  res.status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid password!!!",
      });
    }







  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    // get data
    const { firstName, lastName, phone, password, cnfPassword } = req.body;

    // validate flied's
    if (!firstName || !lastName || !phone || !password || !cnfPassword) {
      return res.status(401).json({
        success: false,
        message: "All filed require...",
      });
    }

    // check password and cnfPassword

    if (password != cnfPassword) {
      return res.status(403).json({
        success: false,
        message: "Password Not match!!!, Retype the Password",
      });
    }
    // check user already exist

    const user = await User.findOne({ phoneNumber: phone });

    if (!user) {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        firstName,
        lastName,
        password: hashPassword,
        username: phone,
        phoneNumber: phone,
      });
      newUser.password = undefined;
      return  res.status(200).json({
        success:true,
        message:"Registration Successfully"
      })
    } else {
      return res.status(409).json({
        success: false,
        message: "User Already Exist",
      });
    }

    // hash password
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.logout = async (req,res)=>{
   try{
    res.clearCookie('token');
    return res.status(200).json({
      success:true,
      message:"Logout successfully"
    })
   }catch(err){
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
   }
}


