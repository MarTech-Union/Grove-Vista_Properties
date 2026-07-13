import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    fullName: String,
    email: String,
    mobile: String,
    department: String,
    nationality: String,
    inMumbai: String,
    cvFileName: String,
    submittedAt: String
  }, { strict: false, collection: 'applications' });

export const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
