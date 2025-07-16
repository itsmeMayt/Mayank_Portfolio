import { exec } from 'child_process';
import path from 'path';

export function commitAndPushVideoData(): Promise<void> {
  return new Promise((resolve, reject) => {
    const filePath = path.join(process.cwd(), 'src/components/videoData.json');
    exec(
      `git add "${filePath}" && git commit -m "Update video data" && git push`,
      (error, stdout, stderr) => {
        if (error) {
          console.error('Git error:', stderr);
          return reject(error);
        }
        console.log('Git output:', stdout);
        resolve();
      }
    );
  });
} 