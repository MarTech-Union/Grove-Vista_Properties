import mongoose from 'mongoose';

const DeveloperProjectSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: String,
    developer: String,
    location: String,
    price: String,
    area: String,
    image: String,
    description: String,
    tags: [String],
    featured: Boolean,
    order: Number,
    createdAt: String,
    updatedAt: String
  }, { strict: false, collection: 'developer_projects' });

export const DeveloperProject = mongoose.models.DeveloperProject || mongoose.model('DeveloperProject', DeveloperProjectSchema);
