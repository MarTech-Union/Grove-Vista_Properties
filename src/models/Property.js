import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: String,
    location: String,
    price: String,
    type: String,
    bedrooms: Number,
    bathrooms: Number,
    area: String,
    image: String,
    description: String,
    amenities: [String],
    featured: Boolean,
    createdAt: String,
    updatedAt: String
  }, { strict: false, collection: 'properties' });

export const Property = mongoose.models.Property || mongoose.model('Property', PropertySchema);
