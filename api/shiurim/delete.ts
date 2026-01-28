import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

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

    const result = await sql`
      DELETE FROM shiurim 
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Shiur not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Shiur deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting shiur:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete shiur'
    });
  }
}
