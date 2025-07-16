const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URI;

async function addOrderField() {
  if (!uri) throw new Error('MONGODB_URI not set');
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('videos');
    const videos = await collection.find({}).sort({ _id: 1 }).toArray();
    for (let i = 0; i < videos.length; i++) {
      await collection.updateOne({ _id: videos[i]._id }, { $set: { order: i } });
    }
    console.log('Added order field to all videos');
  } finally {
    await client.close();
  }
}

addOrderField().catch(err => {
  console.error(err);
  process.exit(1);
}); 