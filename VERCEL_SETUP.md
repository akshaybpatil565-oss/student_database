# Student Database - Vercel + MongoDB Setup Guide

This student database now uses Vercel Functions and MongoDB Atlas for persistent cloud storage.

## Prerequisites

- Vercel account (free at https://vercel.com)
- MongoDB Atlas account (free at https://www.mongodb.com/cloud/atlas)
- Git installed (optional, for easier deployment)

## Setup Instructions

### Step 1: Create MongoDB Atlas Database

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a new project (free tier)
3. Create a **M0 (Free) Cluster**
4. Wait for cluster to be created (5-10 minutes)
5. Go to **Database Access** → Add a new user with username/password
6. Go to **Network Access** → Add `0.0.0.0/0` (allows all IPs for development)
7. Click **Connect** on your cluster
8. Select **Drivers** → Node.js 4.x or later
9. Copy the connection string

### Step 2: Prepare Connection String

Your connection string will look like:
```
mongodb+srv://username:password@cluster0.mongodb.net/myapp?retryWrites=true&w=majority
```

Replace:
- `username` = your MongoDB user
- `password` = your MongoDB password
- Keep everything else the same

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
npm install -g vercel
vercel
```

#### Option B: Using GitHub
1. Push this folder to GitHub
2. Go to https://vercel.com/new
3. Import the GitHub repository
4. Vercel auto-detects the `package.json`
5. Click **Deploy**

### Step 4: Set Environment Variables

After deployment or during setup:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add variable:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB connection string from Step 2
4. Save and redeploy
   - Or run locally: `vercel env pull` then `vercel dev`

### Step 5: Test the App

1. Visit your Vercel deployment URL
2. Add a few student records
3. Search for students
4. Refresh the page — data persists!

## Local Development

### Setup Local Environment

1. Clone or download this project
2. Install Node.js (https://nodejs.org)
3. Run:
   ```bash
   npm install
   vercel env pull
   ```

4. Start development:
   ```bash
   vercel dev
   ```

5. Open `http://localhost:3000` in your browser

## Files

- `index.html` — Frontend UI
- `styles.css` — Styling
- `script.js` — Frontend logic (now calls API)
- `api/students.js` — API endpoint for CRUD operations
- `api/lookup.js` — API endpoint for student lookup
- `package.json` — Node dependencies
- `vercel.json` — Vercel configuration
- `.env.local.example` — Environment variable template

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/students` | Get all students |
| POST | `/api/students` | Add new student |
| DELETE | `/api/students?studentId=id` | Delete student |
| POST | `/api/lookup` | Lookup student by ID |

## Troubleshooting

**"Database connection failed"**
- Check your MongoDB URI in Vercel environment variables
- Verify MongoDB Atlas network access includes `0.0.0.0/0`
- Ensure database user credentials are correct

**"Cannot find module 'mongodb'"**
- Run `npm install` locally
- Vercel will auto-install during deployment

**Data not persisting**
- Verify `MONGODB_URI` environment variable is set
- Check Vercel deployment logs for errors

## Live Deployment

Once set up, your app will be live at:
```
https://your-vercel-app.vercel.app
```

Share this URL with users to access the student database from anywhere!
