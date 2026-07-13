import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    fullName: String,
    email: String,
    mobile: String,
    countryCode: String,
    subject: String,
    bookingDate: String,
    bookingTime: String,
    message: String,
    source: String,
    submittedAt: String
  }, { strict: false, collection: 'bookings' });

export const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
