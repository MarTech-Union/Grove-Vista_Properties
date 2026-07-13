import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: String,
    role: String,
    content: String,
    rating: Number,
    image: String,
    featured: Boolean,
    createdAt: String
  }, { strict: false, collection: 'testimonials' });

export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
