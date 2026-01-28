import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
const UPLOAD_PASSWORD = process.env.SHIURIM_UPLOAD_PASSWORD || 'YedidHamelech2025';
const ADMIN_PASSWORD = process.env.SHIURIM_ADMIN_PASSWORD || 'Admin2025';

function verifyPassword(password: string): { isValid: boolean; isAdmin: boolean } {
  if (password === ADMIN_PASSWORD) {
    return { isValid: true, isAdmin: true };
  }
  if (password === UPLOAD_PASSWORD) {
    return { isValid: true, isAdmin: false };
  }
  return { isValid: false, isAdmin: false };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { password, shiur } = req.body;

    const { isValid } = verifyPassword(password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const id = Date.now().toString();
    const result = await sql`
      INSERT INTO shiurim (id, title, speaker, duration, category, folder, file_url)
      VALUES (${id}, ${shiur.title}, ${shiur.speaker}, ${shiur.duration}, 
              ${shiur.category}, ${shiur.folder || 'General'}, ${shiur.fileUrl || null})
      RETURNING *
    `;

    return res.status(200).json({
      success: true,
      shiur: result[0]
    });
  } catch (error) {
    console.error('Error creating shiur:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create shiur'
    });
  }
}
