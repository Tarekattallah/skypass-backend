// const express = require("express");
// const router = express.Router();
// const bookingController = require("./booking.controller");
// const { authMiddleware } = require("../../middleware/auth.middleware");
// router.post("/", authMiddleware, bookingController.createBooking);
// router.get("/my-bookings", authMiddleware, bookingController.getMyBookings);

// module.exports = router;

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    res.send("booking route works");
});

module.exports = router;