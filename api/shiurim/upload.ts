import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';

const UPLOAD_PASSWORD = process.env.SHIURIM_UPLOAD_PASSWORD || 'YedidHamelech2025';
const ADMIN_PASSWORD = process.env.SHIURIM_ADMIN_PASSWORD || 'Admin2025';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for file upload
  },
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get password from query params
    const password = req.query.password as string;

    // Verify password
    if (password !== UPLOAD_PASSWORD && password !== ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const filename = req.query.filename as string;
    if (!filename) {
      return res.status(400).json({ success: false, message: 'Filename required' });
    }

    // Upload to Vercel Blob
    const blob = await put(`shiurim/${filename}`, req, {
      access: 'public',
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
      message: error instanceof Error ? error.message : 'Failed to upload file'
    });
  }
}
