# ⚠️ Deployment Script Stuck - How to Fix

Your `deploy.bat` script got stuck installing Vercel CLI. This is a common issue.

## ✅ Quick Fix

**Press Ctrl+C** to stop the stuck script, then:

### Option 1: Use Manual Deployment (Easiest)

```bash
DEPLOY_MANUAL.bat
```

This gives you step-by-step instructions to deploy via Vercel web interface (no CLI needed).

### Option 2: Fix npm and Retry

If npm is slow, try:

```bash
npm config set fetch-timeout 120000
npm config set fetch-retry-mintimeout 20000
npm config set fetch-retry-maxtimeout 120000
npm install
npx vercel
```

### Option 3: Deploy to Vercel Directly (Fastest)

**No CLI or npm needed:**

1. Push this folder to GitHub: https://github.com/new
   - Create repo "student-database"
   - Upload files (or use GitHub Desktop)

2. Go to https://vercel.com/new
   - Click [Import Git Repository]
   - Select your GitHub repo
   - Click [Deploy]

3. After deployment, add environment variable:
   - Go to your Vercel project Settings
   - Environment Variables → Add
   - Name: `MONGODB_URI`
   - Value: Your MongoDB connection string

4. Redeploy from Vercel dashboard

**Done!** Your app is live.

## What Went Wrong

The `npm install -g vercel` command can hang due to:
- Slow npm registry
- Network timeout
- Firewall issues
- Disk space

## Better Solution

Use `npx vercel` instead (no global install):

```bash
cd /d "c:\Users\ADMIN\Desktop\student data base system"
npm install
npx vercel
```

`npx` downloads Vercel CLI temporarily without installation.

## MongoDB Connection String Format

When you get your connection string from MongoDB Atlas, it looks like:

```
mongodb+srv://admin:MyPassword123@cluster0.mongodb.net/?retryWrites=true&w=majority
```

Add your database name at the end:
```
mongodb+srv://admin:MyPassword123@cluster0.mongodb.net/students?retryWrites=true&w=majority
```

Paste this into Vercel's `MONGODB_URI` environment variable.

## Fastest Way Forward

1. **Stop the stuck script** (Ctrl+C)
2. **Run:** `DEPLOY_MANUAL.bat`
3. **Follow the on-screen steps**
4. **You'll have a live database in 10 minutes**

---

**Still stuck?** These steps WILL work. The manual deployment method is the most reliable.
