const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config();

// Configuration
const OLD_CLUSTER_URI = process.env.MONGODB_URI; // Your current cluster
const NEW_CLUSTER_URI = process.env.MONGODB_NEW_URI; // Your new cluster URI
const DATABASE_NAME = 'myDatabase'; // Update this to your database name
const COLLECTION_NAME = 'videos';

async function exportVideos() {
  console.log('📤 Exporting videos from current cluster...');
  
  if (!OLD_CLUSTER_URI) {
    console.error('❌ OLD_CLUSTER_URI not found in environment variables');
    return null;
  }

  const client = new MongoClient(OLD_CLUSTER_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });

  try {
    await client.connect();
    console.log('✅ Connected to old cluster');
    
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    const videos = await collection.find({}).toArray();
    console.log(`📊 Found ${videos.length} videos in the collection`);
    
    // Save to JSON file
    const exportData = {
      exportedAt: new Date().toISOString(),
      totalVideos: videos.length,
      videos: videos
    };
    
    fs.writeFileSync('videos-export.json', JSON.stringify(exportData, null, 2));
    console.log('💾 Videos exported to videos-export.json');
    
    return videos;
  } catch (error) {
    console.error('❌ Export failed:', error.message);
    return null;
  } finally {
    await client.close();
  }
}

async function importVideos(videos) {
  console.log('📥 Importing videos to new cluster...');
  
  if (!NEW_CLUSTER_URI) {
    console.error('❌ NEW_CLUSTER_URI not found in environment variables');
    console.log('💡 Add MONGODB_NEW_URI to your .env file');
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
    if (videos && videos.length > 0) {
      const result = await collection.insertMany(videos);
      console.log(`✅ Successfully imported ${result.insertedCount} videos`);
    } else {
      console.log('⚠️  No videos to import');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    return false;
  } finally {
    await client.close();
  }
}

async function migrateVideos() {
  console.log('🚀 Starting video migration process...\n');
  
  // Step 1: Export from old cluster
  const videos = await exportVideos();
  
  if (!videos) {
    console.log('❌ Export failed, cannot proceed with import');
    return;
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Step 2: Import to new cluster
  const success = await importVideos(videos);
  
  if (success) {
    console.log('\n🎉 Migration completed successfully!');
    console.log('📝 Next steps:');
    console.log('1. Update your .env file with the new MONGODB_URI');
    console.log('2. Test the connection: curl http://localhost:3001/api/health');
    console.log('3. Restart your development server');
  } else {
    console.log('\n❌ Migration failed. Please check the error messages above.');
  }
}

// Run migration
migrateVideos().catch(console.error);
