import mongoose, { connect, createConnection } from 'mongoose';

/*
const {
	DATABASE_NAME,
	MONGO_URI,
} = process.env

let mongooseConnection;
let connection;
let db = null;
let client;

const connectDatabase = async () => {
  const mongooseObject = await connect(process.env.MONGO_URI, {
	// await connect(MONGO_URI, {
		useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((error) => {
    console.log(`\n connection to database failed ${error} \n`);
  })
	.then((connectionObject) => {
		console.log(`\n database connected: ${connectionObject.connection.db.databaseName}\n`);
    mongooseConnection = connectionObject;
    client = connectionObject.connection.getClient();
    connection = connectionObject.connection;
    db = connectionObject.connection;
    return connectionObject.connection;
	});
}*/

/*
const dbConnect = async () => {
  try {
    const connectionString = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`\nDB connected: ${connectionString.connection.host}\n`);
  } catch (error) {
    console.log("\nConnection to link DB failed\n");
  } finally {
		console.log("done!");
	}
};
*/

const mongooseObject = connect(process.env.MONGO_URI, {
	useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection
.on('error', (err) => {
  console.log("Mongosose connection error: " + err.message);
})
// .on('connecting', () => {
//   console.log('connecting');
// })
.on('connected', () => {
  console.log(`----------> Mongo database - ${mongoose.connection.db.databaseName} - connected`.bgGreen);
})
// .on('open', () => {
//   console.log("open");
// })
// .on('disconnecting', () => {
//   console.log('disconnecting');
// })
.on('disconnected', () => {
  console.log(`Mongo database disconnected`.bgRed);
})
// .on('close', () => {
//   console.log("close");
// })
// .on('reconnected', () => {
//   console.log("reconnected");
// })

// mongoose.connection = mongooseObject.connection;

// export { mongooseConnection, connection, client, connectDatabase, db }
export default 1;
