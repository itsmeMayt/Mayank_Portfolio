import clientPromise from '@/utils/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Health check: Testing MongoDB connection...');
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('MongoDB connection timeout')), 3000);
    });
    
    const client = await Promise.race([clientPromise, timeoutPromise]);
    const db = client.db();
    
    // Try to ping the database
    await db.admin().ping();
    
    return NextResponse.json({ 
      status: 'healthy', 
      mongodb: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error.message);
    
    return NextResponse.json({ 
      status: 'unhealthy', 
      mongodb: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }
}
