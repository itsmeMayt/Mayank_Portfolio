const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config();

// Configuration
const NEW_CLUSTER_URI = process.env.MONGODB_NEW_URI; // Your new cluster URI
const DATABASE_NAME = 'myDatabase'; // Update this to your database name
const COLLECTION_NAME = 'videos';

async function seedNewCluster() {
  console.log('🌱 Seeding new cluster with local video data...');
  
  if (!NEW_CLUSTER_URI) {
    console.error('❌ MONGODB_NEW_URI not found in environment variables');
    console.log('💡 Add MONGODB_NEW_URI to your .env file with your new cluster connection string');
    return false;
  }

  // Load local video data
  let videos;
  try {
    const videoData = JSON.parse(fs.readFileSync('src/components/videoData.json', 'utf8'));
    videos = videoData;
    console.log(`📊 Loaded ${videos.length} videos from local data`);
  } catch (error) {
    console.error('❌ Failed to load local video data:', error.message);
    return false;
  }

  const client = new MongoClient(NEW_CLUSTER_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });

  try {
    await client.connect();
    console.log('✅ Connected to new cluster');
    
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    // Clear existing videos
    await collection.deleteMany({});
    console.log('🗑️  Cleared existing videos in new cluster');
    
    // Insert videos
    const result = await collection.insertMany(videos);
    console.log(`✅ Successfully seeded ${result.insertedCount} videos`);
    
    // Verify the data
    const count = await collection.countDocuments();
    console.log(`📊 Total videos in new cluster: ${count}`);
    
    return true;
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    return false;
  } finally {
    await client.close();
  }
}

// Run seeding
seedNewCluster().catch(console.error);
