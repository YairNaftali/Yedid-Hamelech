# Shiurim Backend Setup Guide

## Overview
This backend system provides a complete API for managing shiurim (Torah lectures) with:
- CRUD operations for shiurim
- Folder management
- Authentication
- File upload support (ready for cloud storage integration)

## API Endpoints

### GET `/api/shiurim/get`
Fetches all shiurim and folders.

**Response:**
```json
{
  "success": true,
  "shiurim": [...],
  "folders": ["General", ...]
}
```

### POST `/api/shiurim/auth`
Authenticates a user with password.

**Request:**
```json
{
  "password": "YedidHamelech2025"
}
```

**Response:**
```json
{
  "success": true,
  "isAuthenticated": true,
  "isAdmin": false
}
```

### POST `/api/shiurim/create`
Creates a new shiur (requires authentication).

**Request:**
```json
{
  "password": "YedidHamelech2025",
  "shiur": {
    "title": "Meseches Gittin: Iyun on 2a",
    "speaker": "Rov Yonatan Dorfman",
    "duration": "45:00",
    "category": "Iyun",
    "folder": "General"
  }
}
```

### PUT `/api/shiurim/update`
Updates an existing shiur (requires admin).

**Request:**
```json
{
  "password": "Admin2025",
  "shiur": { ...shiur with id }
}
```

### DELETE `/api/shiurim/delete`
Deletes a shiur (requires admin).

**Request:**
```json
{
  "password": "Admin2025",
  "id": "1234567890"
}
```

### POST `/api/shiurim/reorder`
Reorders shiurim list (requires admin).

**Request:**
```json
{
  "password": "Admin2025",
  "shiurimOrder": [...]
}
```

### POST `/api/shiurim/folders`
Manages folders (requires admin).

**Add Folder:**
```json
{
  "password": "Admin2025",
  "action": "add",
  "folderName": "New Folder"
}
```

**Delete Folder:**
```json
{
  "password": "Admin2025",
  "action": "delete",
  "folderName": "Old Folder"
}
```

## Environment Variables

Add these to your Vercel project settings:

```bash
# Required for Neon Postgres database
DATABASE_URL=your_neon_database_url

# Optional: Override default passwords
SHIURIM_UPLOAD_PASSWORD=YedidHamelech2025
SHIURIM_ADMIN_PASSWORD=Admin2025
```

## Setting Up Neon Postgres

1. **Go to Vercel Dashboard:**
   - Navigate to your project
   - Go to "Storage" tab
   - Click "Create Database" or "Browse Storage"

2. **Create Neon Postgres Database:**
   - Select "Neon" from the Marketplace Database Providers
   - Click "Continue"
   - Follow the setup wizard
   - Vercel will automatically add `DATABASE_URL` environment variable

3. **Database Tables:**
   - Tables are automatically created on first API request
   - `shiurim` table stores all shiur information
   - `folders` table stores folder names
   - "General" folder is created automatically

## File Upload Integration

The upload endpoint is ready for cloud storage integration. Popular options:

### Option 1: Cloudinary
```bash
npm install cloudinary
```

Set environment variables:
```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Option 2: AWS S3
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

### Option 3: Google Cloud Storage
```bash
npm install @google-cloud/storage
```

## Frontend Integration

To use the backend with your Shiurim page:

1. **Update App.tsx:**
```tsx
import ShiurimBackend from './pages/ShiurimBackend';

// In your routes:
<Route path="/shiurim" element={<ShiurimBackend />} />
```

2. **Or replace the old component:**
```bash
mv pages/ShiurimBackend.tsx pages/Shiurim.tsx
```

## Testing

1. **Start dev server:**
```bash
npm run dev
```

2. **Test locally:**
- The backend will work with local data during development
- Deploy to Vercel to test with KV storage

## Deployment

```bash
git add -A
git commit -m "Add shiurim backend"
git push
vercel --prod
```

## Security Notes

- Passwords are checked server-side only
- Never expose passwords in frontend code
- Use environment variables for sensitive data
- Consider implementing JWT tokens for production

## Next Steps

1. Set up Vercel KV (Upstash Redis) in your project
2. Add environment variables
3. Test the backend locally
4. Deploy to Vercel
5. Integrate cloud storage for file uploads (optional)
6. Consider adding JWT authentication for enhanced security

## Support

For issues or questions, check:
- Vercel KV documentation: https://vercel.com/docs/storage/vercel-kv
- Upstash Redis: https://docs.upstash.com/redis
