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
const { acceptRequest, rejectRequest } = require("./controllers/bookingController");
const server = http.createServer(app);
const io = socketIo(server,{
	cors:{
		origin:["https://agrorent.vercel.app","http://localhost:3000","*"],
		credentials:true,
		
	}
});
global.io = io;

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:["https://agrorent.vercel.app","http://localhost:3000","*"],
		credentials:true,
		
	})
)

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
app.use("/book",authentication,bookingRouters)
app.post("/book/accept/:id",acceptRequest);
app.post("/book/reject/:id",rejectRequest);


io.on("connection",(socket)=>{
	console.log("userConnected")
	socket.on('disconnect', () => {
		console.log('A user disconnected');
	  });
})
server.listen(PORT,()=>{
    console.log(`Running on port ${PORT}`)
})
