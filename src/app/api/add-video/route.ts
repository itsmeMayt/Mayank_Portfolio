import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const video = {
      id: uuidv4(),
      ...data,
    };
    const client = await clientPromise;
    const db = client.db();
    await db.collection('videos').insertOne(video);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
} 