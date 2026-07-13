import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    email: String,
    subscribedAt: String,
    active: Boolean
  }, { strict: false, collection: 'newsletter' });

export const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);
