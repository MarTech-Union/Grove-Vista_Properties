const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

// Load .env
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("No MONGODB_URI found in .env");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to DB");

    const db = client.db("grovevista");
    const blogsCollection = db.collection("blogs");

    // Clear existing just in case (for idempotency during dev)
    await blogsCollection.deleteMany({});
    console.log("Cleared existing blogs");

    // Dynamic import of ES module or we can just read and parse it...
    // Actually, src/data/blogs.js is ES module with `export const blogs = [...]`.
    // We can use a dynamic import.
  } catch (err) {
    console.error("Error connecting", err);
  } finally {
    await client.close();
  }
}

seed();
