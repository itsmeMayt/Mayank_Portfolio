import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { commitAndPushVideoData } from '@/utils/gitUtils';

export async function POST(req: NextRequest) {
  try {
    const { index, title, description, thumbnail, videoUrl, category } = await req.json();
    const filePath = path.join(process.cwd(), 'src/components/videoData.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const videosArr = JSON.parse(fileContent);
    videosArr[index] = {
      ...videosArr[index],
      title,
      description,
      thumbnail,
      videoUrl,
      category,
    };
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