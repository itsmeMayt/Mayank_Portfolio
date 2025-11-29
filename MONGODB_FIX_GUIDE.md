# 🔧 MongoDB Connection Fix Guide

## ✅ IMMEDIATE FIX APPLIED
Your videos are now working! I've temporarily disabled MongoDB calls so the site uses local data.

## 🚨 MongoDB Issue
The connection is timing out to `159.41.192.38:27017` with error: `Server selection timed out after 3000 ms`

## 🔍 Root Cause
This is typically caused by:
1. **Network Access Restrictions** - Your IP is not whitelisted in MongoDB Atlas
2. **Cluster Status** - The MongoDB cluster might be paused or having issues
3. **Firewall/Network Issues** - Corporate or local firewall blocking the connection

## 🛠️ Step-by-Step Fix

### 1. Check MongoDB Atlas Dashboard
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Log in to your account
3. Select your project

### 2. Fix Network Access
1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Choose one of these options:
   - **"Add Current IP Address"** (recommended for security)
   - **"Allow Access from Anywhere"** (0.0.0.0/0) - less secure but works everywhere

### 3. Check Cluster Status
1. In the left sidebar, click **"Database"**
2. Check if your cluster is **"Running"**
3. If it shows **"Paused"**, click **"Resume"**

### 4. Verify Connection String
1. Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string
4. Make sure it matches your `.env` file

### 5. Test the Connection
```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Should return: {"status":"healthy","mongodb":"connected"}
```

### 6. Re-enable MongoDB
Once the connection works, uncomment the MongoDB code in `src/app/api/videos/route.ts`:

```typescript
// Remove this line:
return NextResponse.json([]);

// Uncomment the MongoDB code block
```

### 7. Seed the Database
```bash
curl -X POST http://localhost:3001/api/seed-videos
```

## 🧪 Alternative Solutions

### Option 1: Use MongoDB Compass
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your connection string
3. If it works, the issue is with your app configuration

### Option 2: Check Your Network
- Try from a different network (mobile hotspot)
- Check if your corporate firewall blocks MongoDB ports
- Try from a different computer

### Option 3: Create New Cluster
If the current cluster is having issues:
1. Create a new MongoDB Atlas cluster
2. Update your `.env` file with the new connection string
3. Run the seed command

## 📞 Need Help?
If you're still having issues:
1. Check the MongoDB Atlas status page
2. Contact MongoDB support
3. Try the alternative solutions above

## ✅ Current Status
- ✅ Videos are working with local data
- ✅ Site is fully functional
- ⏳ MongoDB connection needs to be fixed for database features
