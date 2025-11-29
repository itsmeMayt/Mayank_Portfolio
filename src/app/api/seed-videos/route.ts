import clientPromise from '@/utils/mongodb';
import { NextResponse } from 'next/server';
import videoData from '@/components/videoData.json';

export async function POST() {
  try {
    console.log('Seeding: Attempting to connect to MongoDB...');
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('MongoDB connection timeout')), 5000);
    });
    
    const client = await Promise.race([clientPromise, timeoutPromise]);
    console.log('Seeding: Connected to MongoDB successfully');
    
    const db = client.db();
    const collection = db.collection('videos');
    
    // Clear existing videos
    await collection.deleteMany({});
    console.log('Seeding: Cleared existing videos');
    
    // Insert new videos
    const result = await collection.insertMany(videoData);
    console.log(`Seeding: Inserted ${result.insertedCount} videos`);
    
    return NextResponse.json({ 
      success: true, 
      insertedCount: result.insertedCount,
      message: 'Videos seeded successfully'
    });
  } catch (error) {
    console.error('Seeding failed:', error.message);
    
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      message: 'Failed to seed videos'
    }, { status: 500 });
  }
}
