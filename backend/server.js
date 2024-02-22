const express = require("express");
const app = express();
const dotenv = require('dotenv');
const dataBase = require("./config/database")
const cookieParser = require('cookie-parser');
const cors = require("cors")
const {cloudinaryConnect} = require("./config/cloudconfig");
const fileUpload = require("express-fileupload")
const authRoutes = require("./routes/auth");
const equipmentRoutes = require("./routes/equipmentRoutes");
const profileRoute = require("./routes/profile")
const { authentication } = require("./middleware/Auth");
const bookingRouters = require("./routes/bookingRotes");
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server,{
	cors:{
		origin:["https://agrorent.vercel.app","http://localhost:3000","*"],
		credentials:true,
		
	}
});

dotenv.config();

app.use(express.json());
app.use(cookieParser());
// app.use(
// 	cors({
// 		origin:["https://agrorent.vercel.app","http://localhost:3000","*"],
// 		credentials:true,
		
// 	})
// )

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);


cloudinaryConnect();


dataBase.connect();

const PORT = process.env.PORT || 4000;
app.use("/auth",authRoutes);
app.use("/equ",authentication,equipmentRoutes);
app.use("/profile",authentication,profileRoute);
app.use("/book",bookingRouters)

io.on("connection",(socket)=>{
	// console.log("User connected..",socket.id)
	socket.on('disconnect', () => {
		console.log('A user disconnected');
	  });
})
server.listen(PORT,()=>{
    console.log(`Running on port ${PORT}`)
})
