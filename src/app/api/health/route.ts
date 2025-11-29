import clientPromise from '@/utils/mongodb';
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    console.log('Health check: Testing MongoDB connection...');
    
    const timeoutPromise = new Promise<MongoClient>((_, reject) => {
      setTimeout(() => reject(new Error('MongoDB connection timeout')), 3000);
    });
    
    const client = (await Promise.race([clientPromise, timeoutPromise])) as MongoClient;
    const db = client.db();
    
    // Try to ping the database
    await db.admin().ping();
    
    return NextResponse.json({ 
      status: 'healthy', 
      mongodb: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Health check failed:', errorMessage);
    
    return NextResponse.json({ 
      status: 'unhealthy', 
      mongodb: 'disconnected',
      error: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }
}
