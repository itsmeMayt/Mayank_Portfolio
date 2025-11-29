# 🔄 MongoDB Cluster Migration Guide

## 🎯 Goal
Migrate your video collection from the current problematic cluster to a new working cluster.

## 📋 Prerequisites
1. Create a new MongoDB Atlas cluster
2. Get the new connection string
3. Update your environment variables

## 🚀 Step-by-Step Migration

### Step 1: Create New MongoDB Cluster
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **"Create"** or **"New Project"**
3. Choose **"Build a Database"**
4. Select **"M0 Sandbox"** (free tier) or higher
5. Choose a region close to you
6. Create the cluster

### Step 2: Configure Network Access
1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Choose **"Allow Access from Anywhere"** (0.0.0.0/0) for testing
4. Or add your current IP address for security

### Step 3: Create Database User
1. In the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Create a username and password
5. Set privileges to **"Read and write to any database"**

### Step 4: Get Connection String
1. Click **"Connect"** on your new cluster
2. Choose **"Connect your application"**
3. Select **"Node.js"** and version **"4.1 or later"**
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with your database name (e.g., `myDatabase`)

### Step 5: Update Environment Variables
Add to your `.env` file:
```env
# New cluster connection string
MONGODB_NEW_URI=mongodb+srv://username:password@cluster.mongodb.net/myDatabase?retryWrites=true&w=majority

# Keep the old one for reference
MONGODB_URI=mongodb+srv://old-username:old-password@old-cluster.mongodb.net/myDatabase?retryWrites=true&w=majority
```

### Step 6: Test New Cluster Connection
```bash
# Test the new cluster
node seed-new-cluster.js
```

### Step 7: Update Application
Once the new cluster is working, update your `.env` file:
```env
# Replace the old URI with the new one
MONGODB_URI=mongodb+srv://new-username:new-password@new-cluster.mongodb.net/myDatabase?retryWrites=true&w=majority
```

### Step 8: Re-enable MongoDB in Application
Edit `src/app/api/videos/route.ts`:
1. Remove the line: `return NextResponse.json([]);`
2. Uncomment the MongoDB code block

### Step 9: Test Application
```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Should return: {"status":"healthy","mongodb":"connected"}
```

## 🛠️ Available Scripts

### Option 1: Seed New Cluster (Recommended)
```bash
node seed-new-cluster.js
```
This uses your local `videoData.json` to populate the new cluster.

### Option 2: Full Migration (If old cluster works)
```bash
node migrate-videos.js
```
This exports from the old cluster and imports to the new one.

## 🔍 Troubleshooting

### Connection Issues
- Check if your IP is whitelisted
- Verify the connection string format
- Ensure the cluster is running
- Check if the database user has proper permissions

### Data Issues
- Verify the database name matches
- Check if the collection name is correct
- Ensure the data structure matches your application

### Application Issues
- Restart your development server after updating .env
- Check the console for error messages
- Verify the API endpoints are working

## 📊 Verification

After migration, verify:
1. ✅ New cluster connection works
2. ✅ Videos are imported successfully
3. ✅ Application uses database data
4. ✅ All features work as expected

## 🎉 Success!

Once migration is complete:
- Your videos will be stored in the new cluster
- The application will use database data instead of local data
- You can manage videos through the admin panel
- All CRUD operations will work properly
