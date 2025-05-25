
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

// Extend Node.js global object type
declare global {
	// eslint-disable-next-line no-var
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Create the MongoClient once
const client = new MongoClient(uri, options);

const clientPromise =
	globalThis._mongoClientPromise ??
	(globalThis._mongoClientPromise = client.connect());

export default clientPromise;
