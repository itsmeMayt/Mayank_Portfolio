const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
dotenv.config();

// Read videos array from JSON file
function getVideos() {
  const jsonPath = path.join(__dirname, '../src/components/videoData.json');
  const file = fs.readFileSync(jsonPath, 'utf-8');
  return JSON.parse(file);
}

const uri = process.env.MONGODB_URI;

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
    const videos = getVideos();
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