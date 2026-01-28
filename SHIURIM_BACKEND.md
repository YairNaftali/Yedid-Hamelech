# Shiurim Backend Setup Guide

## Overview
This backend system provides a complete API for managing shiurim (Torah lectures) with:
- CRUD operations for shiurim (metadata stored in Postgres)
- File upload to Vercel Blob (audio files stored separately)
- Folder management
- Authentication

## Architecture

**Neon Postgres Database** (0.5GB - plenty for metadata)
- Stores shiur metadata: titles, speakers, durations, categories
- Each record is only a few KB

**Vercel Blob Storage** (larger limits for files)
- Stores actual audio recordings (MP3s, etc.)
- Database only stores the URL to the blob

This separation ensures your database doesn't run out of space!

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
# Required - Auto-added by Vercel when you create the databases
DATABASE_URL=your_neon_database_url
BLOB_READ_WRITE_TOKEN=your_blob_token

# Optional: Override default passwords
SHIURIM_UPLOAD_PASSWORD=YedidHamelech2025
SHIURIM_ADMIN_PASSWORD=Admin2025
```

## Setting Up Storage

### 1. Neon Postgres (for metadata)
1. Go to Vercel Dashboard → your project
2. Click "Storage" tab → "Create Database"
3. Select **"Neon"** (Serverless Postgres)
4. Complete setup - adds `DATABASE_URL` automatically

### 2. Vercel Blob (for audio files)
1. In same Storage tab, click "Create Database" again
2. Select **"Blob"** (Fast object storage)
3. Complete setup - adds `BLOB_READ_WRITE_TOKEN` automatically

Both are needed for the full shiurim system!

## File Upload Integration

The upload endpoint now uses Vercel Blob for storing audio files.

**How it works:**
1. User uploads an audio file through the form
2. File is sent to `/api/shiurim/upload`
3. File is stored in Vercel Blob storage
4. The blob URL is saved in the database with the shiur metadata

**Vercel Blob Benefits:**
- Designed for large files
- Fast CDN delivery
- Automatic scaling
- Pay only for what you use

No additional configuration needed - just create the Blob storage in Vercel!

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
