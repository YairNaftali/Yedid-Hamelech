import type { VercelRequest, VercelResponse } from '@vercel/node';

const UPLOAD_PASSWORD = process.env.SHIURIM_UPLOAD_PASSWORD || 'YedidHamelech2025';
const ADMIN_PASSWORD = process.env.SHIURIM_ADMIN_PASSWORD || 'Admin2025';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { password } = req.body;

    if (password === ADMIN_PASSWORD) {
      return res.status(200).json({
        success: true,
        isAuthenticated: true,
        isAdmin: true
      });
    }

    if (password === UPLOAD_PASSWORD) {
      return res.status(200).json({
        success: true,
        isAuthenticated: true,
        isAdmin: false
      });
    }

    return res.status(401).json({
      success: false,
      isAuthenticated: false,
      isAdmin: false,
      message: 'Invalid password'
    });
  } catch (error) {
    console.error('Error authenticating:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
}
