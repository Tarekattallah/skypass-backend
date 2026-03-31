const Booking = require('./booking.model');
const Flight = require('../flights/flight.model');

exports.createBooking = async (req, res, next) => {
    try {
        const { flightId, seatClass } = req.body;

        const flight = await Flight.findById(flightId);

        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        let seatField = 'economySeatsAvailable';
        let price = flight.economyPrice;

        if (seatClass === 'business') {
            seatField = 'businessSeatsAvailable';
            price = flight.businessPrice;
        }

        if (flight[seatField] <= 0) {
            return res.status(400).json({ message: "No seats available" });
        }

        const booking = await Booking.create({
            user: req.user.id,
            flight: flightId,
            seatClass: seatClass,
            totalPrice: price
        });

        flight[seatField] = flight[seatField] - 1;
        await flight.save();

        res.status(201).json({
            status: 'success',
            data: booking
        });

    } catch (err) {
        next(err);
    }
};

exports.getMyBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate("flight");

        res.status(200).json({
            status: 'success',
            data: bookings
        });

    } catch (err) {
        next(err);
    }
};