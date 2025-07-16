import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { id, title, description, thumbnail, videoUrl, category } = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('videos').updateOne(
      { id },
      { $set: { title, description, thumbnail, videoUrl, category } }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
} 