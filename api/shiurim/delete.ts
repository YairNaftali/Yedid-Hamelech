import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import { del } from '@vercel/blob';

const sql = neon(process.env.DATABASE_URL!);
const ADMIN_PASSWORD = process.env.SHIURIM_ADMIN_PASSWORD || 'Admin2025';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { password, id } = req.body;

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Admin access required' });
    }

    // Get shiur to find file_url before deleting
    const shiur = await sql`
      SELECT file_url FROM shiurim WHERE id = ${id}
    `;

    if (shiur.length === 0) {
      return res.status(404).json({ success: false, message: 'Shiur not found' });
    }

    // Delete from database
    await sql`
      DELETE FROM shiurim WHERE id = ${id}
    `;

    // Delete file from Blob storage if it exists
    if (shiur[0].file_url) {
      try {
        await del(shiur[0].file_url);
      } catch (blobError) {
        console.error('Error deleting blob file:', blobError);
        // Continue even if blob deletion fails
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Shiur deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting shiur:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete shiur'
    });
  }
}
