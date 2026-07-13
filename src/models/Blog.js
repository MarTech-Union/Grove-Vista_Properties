import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    title: String,
    slug: { type: String, unique: true },
    content: String,
    excerpt: String,
    coverImage: String,
    tags: [String],
    publishedAt: String,
    createdAt: String,
    updatedAt: String
  }, { strict: false, collection: 'blogs' });

export const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
