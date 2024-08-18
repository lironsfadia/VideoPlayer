import { FFmpegKit, FFprobeKit, ReturnCode } from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';

const generateUniqueFileName = async (
  basePath: string,
  baseName: string,
  extension: string
): Promise<string> => {
  let counter = 0;
  let fileName = `${baseName}${extension}`;
  while (await RNFS.exists(`${basePath}/${fileName}`)) {
    counter++;
    fileName = `${baseName}_${counter}${extension}`;
  }
  return fileName;
};

async function executeFFmpeg(command: string) {
  try {
    const session = await FFmpegKit.execute(command);
    const returnCode = await session.getReturnCode();

    if (ReturnCode.isSuccess(returnCode)) {
      console.log('FFmpeg process completed successfully');
    } else if (ReturnCode.isCancel(returnCode)) {
      console.log('FFmpeg process cancelled');
    } else {
      console.error('FFmpeg process failed with rc=' + returnCode);
    }
  } catch (error) {
    console.error('FFmpeg execute error:', error);
  }
}

async function getMediaInfo(filePath: string) {
  try {
    const session = await FFprobeKit.getMediaInformation(filePath);
    const information = await session.getMediaInformation();

    if (information) {
      console.log('Duration: ' + information.getDuration());
      console.log('Bitrate: ' + information.getBitrate());
      console.log('Format: ' + information.getFormat());
    } else {
      console.log('No media information found');
    }
  } catch (error) {
    console.error('FFprobe error:', error);
  }
}

export { executeFFmpeg, getMediaInfo, generateUniqueFileName };

// Usage examples:
// executeFFmpeg(
//   '-i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4'
// );
// getMediaInfo('input.mp4');
