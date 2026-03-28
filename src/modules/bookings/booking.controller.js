const Booking = require('./booking.model');
const Flight = require('../flights/flight.model');

exports.createBooking = async (req, res, next) => {
    try {
        const { flightId, seatClass } = req.body;
        const flight = await Flight.findById(flightId);
        
        const seatField = seatClass === 'business' ? 'businessSeatsAvailable' : 'economySeatsAvailable';
        if (flight[seatField] <= 0) return res.status(400).json({ message: "No seats!" });

        const booking = await Booking.create({
            user: req.user.id,
            flight: flightId,
            seatClass,
            totalPrice: seatClass === 'business' ? flight.businessPrice : flight.economyPrice
        });

        flight[seatField] -= 1;
        await flight.save();
        res.status(201).json({ status: 'success', data: booking });
    } catch (err) { next(err); }
};