# MongoDB Connection Fix

## Current Issue
The MongoDB connection is timing out with error: `connect ETIMEDOUT 159.41.192.38:27017`

## Possible Solutions

### 1. Check MongoDB Atlas Network Access
- Go to MongoDB Atlas dashboard
- Navigate to Network Access
- Ensure your current IP address is whitelisted
- Or add `0.0.0.0/0` for all IPs (less secure but works for development)

### 2. Check MongoDB Atlas Cluster Status
- Go to MongoDB Atlas dashboard
- Check if your cluster is running
- Restart the cluster if needed

### 3. Verify Connection String
- Check if the MONGODB_URI in your .env file is correct
- Ensure it includes the correct database name
- Format should be: `mongodb+srv://username:password@cluster.mongodb.net/databaseName?retryWrites=true&w=majority`

### 4. Test Connection
Run the health check endpoint:
```bash
curl http://localhost:3001/api/health
```

### 5. Seed Database (when connection works)
```bash
curl -X POST http://localhost:3001/api/seed-videos
```

## Current Fallback
The application currently uses local videoData.json as fallback when MongoDB is unavailable, so the site should still work.

## Debug Commands
```bash
# Test MongoDB connection
node test-mongo-connection.js

# Check health endpoint
curl http://localhost:3001/api/health

# Seed videos (when MongoDB works)
curl -X POST http://localhost:3001/api/seed-videos
```
