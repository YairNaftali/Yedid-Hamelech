import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
const ADMIN_PASSWORD = process.env.SHIURIM_ADMIN_PASSWORD || 'Admin2025';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { password, shiurimOrder } = req.body;

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Admin access required' });
    }

    // Update each shiur's position based on array order
    for (let i = 0; i < shiurimOrder.length; i++) {
      await sql`
        UPDATE shiurim 
        SET updated_at = CURRENT_TIMESTAMP
        WHERE id = ${shiurimOrder[i].id}
      `;
    }

    return res.status(200).json({
      success: true,
      message: 'Order updated successfully'
    });
  } catch (error) {
    console.error('Error reordering shiurim:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to reorder shiurim'
    });
  }
}
