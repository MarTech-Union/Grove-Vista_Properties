import mongoose from 'mongoose';

const DeveloperFaqSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    developer: String,
    question: String,
    answer: String,
    order: Number,
    createdAt: String,
    updatedAt: String
  }, { strict: false, collection: 'developer_faqs' });

export const DeveloperFaq = mongoose.models.DeveloperFaq || mongoose.model('DeveloperFaq', DeveloperFaqSchema);
