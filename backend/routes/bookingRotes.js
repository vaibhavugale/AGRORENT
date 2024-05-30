const { sendBookRequest } = require("../controllers/bookingController");

const router = require("express").Router();

router.post("/send-book-request",sendBookRequest);



module.exports = router;