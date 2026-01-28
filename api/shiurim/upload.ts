import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';

const UPLOAD_PASSWORD = process.env.SHIURIM_UPLOAD_PASSWORD || 'YedidHamelech2025';
const ADMIN_PASSWORD = process.env.SHIURIM_ADMIN_PASSWORD || 'Admin2025';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb', // Allow large audio files
    },
  },
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { password, fileName, fileData } = req.body;

    // Verify password
    if (password !== UPLOAD_PASSWORD && password !== ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    if (!fileData) {
      return res.status(400).json({ success: false, message: 'No file data provided' });
    }

    // Upload to Vercel Blob
    const blob = await put(`shiurim/${fileName}`, fileData, {
      access: 'public',
      addRandomSuffix: false,
    });

    return res.status(200).json({
      success: true,
      url: blob.url,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload file'
    });
  }
}
