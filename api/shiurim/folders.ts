import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
const ADMIN_PASSWORD = process.env.SHIURIM_ADMIN_PASSWORD || 'Admin2025';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { password, action, folderName } = req.body;

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Admin access required' });
    }

    if (action === 'add') {
      if (!folderName) {
        return res.status(400).json({ success: false, message: 'Folder name required' });
      }
      
      try {
        await sql`
          INSERT INTO folders (name) VALUES (${folderName})
        `;
      } catch (error: any) {
        if (error.message?.includes('duplicate')) {
          return res.status(400).json({ success: false, message: 'Folder already exists' });
        }
        throw error;
      }

      const foldersResult = await sql`SELECT name FROM folders ORDER BY name`;
      const folders = foldersResult.map((f: any) => f.name);
      return res.status(200).json({ success: true, folders });
    }

    if (action === 'delete') {
      if (folderName === 'General') {
        return res.status(400).json({ success: false, message: 'Cannot delete General folder' });
      }

      await sql`
        UPDATE shiurim 
        SET folder = 'General' 
        WHERE folder = ${folderName}
      `;

      await sql`
        DELETE FROM folders 
        WHERE name = ${folderName}
      `;

      const foldersResult = await sql`SELECT name FROM folders ORDER BY name`;
      const folders = foldersResult.map((f: any) => f.name);
      return res.status(200).json({ success: true, folders });
    }

    return res.status(400).json({ success: false, message: 'Invalid action' });
  } catch (error) {
    console.error('Error managing folders:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to manage folders'
    });
  }
}
