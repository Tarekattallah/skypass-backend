const Flight = require('./flight.model');

// بجيب كل الرحلات عشان نعرضها في الفرونت
exports.getAllFlights = async (req, res) => {
    try {
        const flights = await Flight.find()
            .populate('origin destination airplane'); // عشان يجيب بيانات المطار والطيارة مش بس الـ ID
        res.status(200).json({ status: 'success', data: flights });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// لو عايزة تضيفي رحلة جديدة (للأدمن)
exports.createFlight = async (req, res) => {
    try {
        const newFlight = await Flight.create(req.body);
        res.status(201).json({ status: 'success', data: newFlight });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};