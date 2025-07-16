import { MongoClient } from 'mongodb';
import { videos } from '../src/components/videoData';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI!;

async function seed() {
  if (!uri) {
    throw new Error('MONGODB_URI not set');
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('videos');
    // Remove existing videos to avoid duplicates
    await collection.deleteMany({});
    // Insert all videos
    await collection.insertMany(videos);
    console.log('Seeded videos to MongoDB');
  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
}); 