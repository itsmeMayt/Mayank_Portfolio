import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const options = {
  serverSelectionTimeoutMS: 3000, // Reduce to 3 seconds for faster fallback
  socketTimeoutMS: 30000, // Close sockets after 30 seconds of inactivity
  connectTimeoutMS: 5000, // Give up initial connection after 5 seconds
  maxPoolSize: 5, // Reduce pool size
  minPoolSize: 1, // Minimum connections
  maxIdleTimeMS: 10000, // Close connections after 10 seconds of inactivity
  retryWrites: true,
  retryReads: true,
  heartbeatFrequencyMS: 10000,
};

// Extend the global type to include our mongo client promise
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise; 