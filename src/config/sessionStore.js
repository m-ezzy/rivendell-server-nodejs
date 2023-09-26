import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
// import { connection, client } from '../database.js';

export default MongoStore.create({
	// mongoUrl: process.env.MONGO_URI,
	client: mongoose.connection.getClient(),
	dbName: process.env.DATABASE_NAME,
	collectionName: 'sessions',
	ttl: 60 * 60 * 24 * 14, // 14 days
	autoRemove: 'native',
	touchAfter: 3600 * 24, // 1 day
});
