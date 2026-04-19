# Student Database System

A modern student database web app with local and cloud storage options.

## Features

- Add, search, and delete student records
- Two interfaces: Manage Students (table view) and Lookup Student (detail view)
- Dashboard with stats (total students, last added, search status)
- Local browser storage (localStorage) or cloud storage with Vercel + MongoDB
- Modern, responsive UI design

## Storage Options

### Local Storage (Default)
- Data stored in browser's localStorage
- Works immediately, no setup needed
- Data persists locally in browser only

### Cloud Storage (Recommended)
- Data stored in MongoDB Atlas database
- Deploy on Vercel (free tier)
- Access from anywhere
- See [VERCEL_SETUP.md](VERCEL_SETUP.md) for setup instructions

## Files

- `index.html` — main UI page
- `styles.css` — page styling
- `script.js` — app logic (calls API when deployed, uses localStorage otherwise)
- `api/students.js` — Vercel serverless function for student CRUD
- `api/lookup.js` — Vercel serverless function for student lookup
- `package.json` — Node.js dependencies for Vercel
- `vercel.json` — Vercel deployment config
- `.env.local.example` — MongoDB connection template
- `VERCEL_SETUP.md` — cloud deployment guide

## Quick Start (Local)

1. Open `index.html` in your browser.
2. Add student records using the form.
3. Search student records using the search input.
4. Delete individual records or clear all records.

## 🚀 Deploy to Cloud (Multi-User)

**Get live now with real-time multi-user sync:**

1. Run: `START_HERE.bat` (or read `DEPLOY_NOW.md`)
2. Follow the 5-minute setup steps
3. Share your live URL with other users

**Benefits:**
- ✅ Access from anywhere
- ✅ Multiple users see same database
- ✅ Real-time data sync
- ✅ Free tier (Vercel + MongoDB Atlas)
- ✅ No credit card required

See `DEPLOY_NOW.md` for step-by-step guide.

## Installer

- `installer.iss` — Inno Setup installer script for building `StudentDatabaseInstaller.exe`
- `build-installer.bat` — batch file to compile the installer if Inno Setup is installed

To build the installer:
1. Install Inno Setup from https://jrsoftware.org/isinfo.php
2. Run `build-installer.bat`
3. Use the generated `StudentDatabaseInstaller.exe` to install the app on Windows 10.
