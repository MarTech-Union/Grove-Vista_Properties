import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { blogs } from "../src/data/blogs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1]] = match[2];
    }
  });
}


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

    await blogsCollection.deleteMany({});
    console.log("Cleared existing blogs");

    const formattedBlogs = blogs.map(blog => {
      const { id, ...rest } = blog;
      return {
        ...rest,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    if (formattedBlogs.length > 0) {
      await blogsCollection.insertMany(formattedBlogs);
      console.log(`Seeded ${formattedBlogs.length} blogs successfully.`);
    }
  } catch (err) {
    console.error("Error connecting", err);
  } finally {
    await client.close();
  }
}

seed();
