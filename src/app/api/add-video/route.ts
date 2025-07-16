import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { commitAndPushVideoData } from '@/utils/gitUtils';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const video = {
      id: uuidv4(),
      ...data,
    };
    const filePath = path.join(process.cwd(), 'src/components/videoData.json');
    let videosArr = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      videosArr = JSON.parse(fileContent);
    } catch {
      videosArr = [];
    }
    videosArr.push(video);
    await fs.writeFile(filePath, JSON.stringify(videosArr, null, 2), 'utf-8');
    try {
      await commitAndPushVideoData();
    } catch (gitErr) {
      console.error('Git commit/push failed:', gitErr);
    }
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
} 