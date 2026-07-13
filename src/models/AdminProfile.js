import mongoose from 'mongoose';

const AdminProfileSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    username: String,
    email: String,
    passwordHash: String,
    role: String,
    createdAt: String
  }, { strict: false, collection: 'admin_profiles' });

export const AdminProfile = mongoose.models.AdminProfile || mongoose.model('AdminProfile', AdminProfileSchema);
