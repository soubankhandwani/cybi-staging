import "server-only";

import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
  mongoIndexesPromise?: Promise<void>;
};

function connectionString() {
  const value = process.env.MONGODB_URI?.trim();
  if (!value) throw new Error("MONGODB_URI is not configured.");
  return value;
}

function clientPromise() {
  if (!globalForMongo.mongoClientPromise) {
    const client = new MongoClient(connectionString(), {
      appName: "cyberi-publishing",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5_000,
    });
    globalForMongo.mongoClientPromise = client.connect().catch(async (error) => {
      globalForMongo.mongoClientPromise = undefined;
      await client.close().catch(() => {});
      throw error;
    });
  }
  return globalForMongo.mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise();
  const db = client.db(process.env.MONGODB_DB?.trim() || "cyberi");
  if (!globalForMongo.mongoIndexesPromise) {
    globalForMongo.mongoIndexesPromise = ensureIndexes(db).catch((error) => {
      globalForMongo.mongoIndexesPromise = undefined;
      throw error;
    });
  }
  await globalForMongo.mongoIndexesPromise;
  return db;
}

async function ensureIndexes(db: Db) {
  await Promise.all([
    db.collection("admins").createIndex({ email: 1 }, { unique: true }),
    db.collection("sessions").createIndex({ tokenHash: 1 }, { unique: true }),
    db.collection("sessions").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    db.collection("rateLimits").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    db.collection("blogs").createIndex({ slug: 1 }, { unique: true }),
    db.collection("blogs").createIndex({ status: 1, publishedAt: -1, updatedAt: -1 }),
  ]);
}

