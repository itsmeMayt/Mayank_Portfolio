import { NextResponse } from 'next/server';

export async function GET() {
  // Temporarily disable MongoDB due to connection issues
  console.log('API: MongoDB temporarily disabled due to connection timeout');
  console.log('API: Returning empty array to use local data fallback');
  
  // Return empty array to trigger fallback to local data
  return NextResponse.json([]);
  
  /* MongoDB code - uncomment when connection is fixed
  // First, add: import clientPromise from '@/utils/mongodb'; at the top of the file
  
  try {
    console.log('API: Attempting to connect to MongoDB...');
    
    // Add timeout to the client promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('MongoDB connection timeout')), 5000);
    });
    
    const client = await Promise.race([clientPromise, timeoutPromise]);
    console.log('API: Connected to MongoDB successfully');
    
    const db = client.db(); // uses the default DB from your URI
    console.log('API: Fetching videos from collection...');
    
    const videos = await db.collection('videos').find({}).toArray();
    console.log(`API: Found ${videos.length} videos`);
    
    return NextResponse.json(videos);
  } catch (error) {
    console.error('API: MongoDB connection error:', error.message);
    
    // Return empty array instead of error to allow fallback to local data
    return NextResponse.json([]);
  }
  */
} 