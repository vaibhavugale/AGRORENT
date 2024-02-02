const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.CLOUD_API_KEY,
			api_secret: process.env.CLOUD_SECREATE_KEY,
		});
	} catch (error) {
		console.log(error);
	}
};