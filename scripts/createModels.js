const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, '..', 'src', 'models');
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const schemas = {
  Blog: `{
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
  }`,
  Booking: `{
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
  }`,
  Application: `{
    id: { type: String, unique: true },
    fullName: String,
    email: String,
    mobile: String,
    department: String,
    nationality: String,
    inMumbai: String,
    cvFileName: String,
    submittedAt: String
  }`,
  DeveloperFaq: `{
    id: { type: String, unique: true },
    developer: String,
    question: String,
    answer: String,
    order: Number,
    createdAt: String,
    updatedAt: String
  }`,
  DeveloperProject: `{
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
  }`,
  SiteFaq: `{
    id: { type: String, unique: true },
    category: String,
    question: String,
    answer: String,
    order: Number,
    createdAt: String,
    updatedAt: String
  }`,
  Property: `{
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
  }`,
  Newsletter: `{
    id: { type: String, unique: true },
    email: String,
    subscribedAt: String,
    active: Boolean
  }`,
  AdminProfile: `{
    id: { type: String, unique: true },
    username: String,
    email: String,
    passwordHash: String,
    role: String,
    createdAt: String
  }`,
  Testimonial: `{
    id: { type: String, unique: true },
    name: String,
    role: String,
    content: String,
    rating: Number,
    image: String,
    featured: Boolean,
    createdAt: String
  }`
};

for (const [modelName, schemaDef] of Object.entries(schemas)) {
  const fileContent = "import mongoose from 'mongoose';\\n\\n" +
  "const " + modelName + "Schema = new mongoose.Schema(" + schemaDef + ", { strict: false });\\n\\n" +
  "export const " + modelName + " = mongoose.models." + modelName + " || mongoose.model('" + modelName + "', " + modelName + "Schema);\\n";
  fs.writeFileSync(path.join(modelsDir, modelName + '.js'), fileContent);
}

console.log("Models created successfully.");

