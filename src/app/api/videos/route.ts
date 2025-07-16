import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/components/videoData.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const videosArr = JSON.parse(fileContent);
    return NextResponse.json(videosArr);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
} 