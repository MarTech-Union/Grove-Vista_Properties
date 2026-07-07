import { MongoClient } from "mongodb";

const dbName = process.env.MONGODB_DB || "grovevista";

let clientPromise;

function getClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI environment variable is not set. Add it to .env.local or your Vercel environment variables."
    );
  }

  if (process.env.NODE_ENV === "development") {
    // Reuse connection across hot reloads in development
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getCollection(name) {
  const client = await getClientPromise();
  return client.db(dbName).collection(name);
}
