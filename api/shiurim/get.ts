import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function initDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS shiurim (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      speaker TEXT NOT NULL,
      duration TEXT NOT NULL,
      category TEXT NOT NULL,
      folder TEXT NOT NULL,
      file_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS folders (
      name TEXT PRIMARY KEY,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    INSERT INTO folders (name) VALUES ('General')
    ON CONFLICT (name) DO NOTHING
  `;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await initDatabase();

    const shiurim = await sql`
      SELECT * FROM shiurim 
      ORDER BY created_at DESC
    `;

    const foldersResult = await sql`
      SELECT name FROM folders 
      ORDER BY name
    `;
    const folders = foldersResult.map((f: any) => f.name);

    return res.status(200).json({
      success: true,
      shiurim,
      folders
    });
  } catch (error) {
    console.error('Error fetching shiurim:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch shiurim'
    });
  }
}
