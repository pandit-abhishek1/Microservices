import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

/**
 * Uploads any file (image, video, raw) to Cloudinary.
 */
export function upload(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate,
        resource_type: 'auto', // auto-detects file type
      },
      (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload failed with no result"));
        resolve(result);
      }
    );
  });
}

/**
 * Uploads a video file to Cloudinary with chunking enabled (for large files).
 */
export function videoUpload(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate,
        chunk_size: 6000000, // 6MB chunks for large videos
        resource_type: 'video',
      },
      (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Video upload failed with no result"));
        resolve(result);
      }
    );
  });
}
