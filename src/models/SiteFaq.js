import mongoose from 'mongoose';

const SiteFaqSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    category: String,
    question: String,
    answer: String,
    order: Number,
    createdAt: String,
    updatedAt: String
  }, { strict: false, collection: 'site_faqs' });

export const SiteFaq = mongoose.models.SiteFaq || mongoose.model('SiteFaq', SiteFaqSchema);
