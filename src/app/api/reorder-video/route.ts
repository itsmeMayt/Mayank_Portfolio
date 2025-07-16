import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { index, direction } = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const videosArr = await db.collection('videos').find({}).sort({ order: 1, _id: 1 }).toArray();
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= videosArr.length) throw new Error('Invalid move');
    // Swap order fields
    const videoA = videosArr[index];
    const videoB = videosArr[newIndex];
    await db.collection('videos').updateOne({ _id: videoA._id }, { $set: { order: newIndex } });
    await db.collection('videos').updateOne({ _id: videoB._id }, { $set: { order: index } });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
} 