import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
const ADMIN_PASSWORD = process.env.SHIURIM_ADMIN_PASSWORD || 'Admin2025';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { password, shiur } = req.body;

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Admin access required' });
    }

    const result = await sql`
      UPDATE shiurim 
      SET title = ${shiur.title},
          speaker = ${shiur.speaker},
          duration = ${shiur.duration},
          category = ${shiur.category},
          folder = ${shiur.folder || 'General'},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${shiur.id}
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Shiur not found' });
    }

    return res.status(200).json({
      success: true,
      shiur: result[0]
    });
  } catch (error) {
    console.error('Error updating shiur:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update shiur'
    });
  }
}
