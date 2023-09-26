// import dotenv from 'dotenv';
// dotenv.config({ path: `./env-files/${process.env.NODE_ENV || 'development'}.env`, options: { debug: true } });

// import path from 'path'
// import url from 'url'
import http from 'http';

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
import cors from 'cors';

// import mongoose from 'mongoose';
// import { mongooseConnection, connection, client, connectDatabase } from './database.js';
import database from './database.js';
import { clearDatabase, populateDatabase } from './seeder.js';

import session from 'express-session';
// import MongoStore from 'connect-mongo';
import sessionStore from './config/sessionStore.js';

import passport from 'passport';
import passportExecute from './passport.js';

import routes from './routes.js';
// import routes from './routes/all.js';

import io from './sockets.js';
import { instrument } from "@socket.io/admin-ui";

import colors from 'colors';

// await connectDatabase();

// await buildDatabase();

const port = process.env.PORT || 8000;

const app = express();

const httpServer = http.createServer(app);

// app.use(morgan("dev"));

io.attach(httpServer);

// go to this site ---> https://admin.socket.io/
instrument(io, {
  auth: false,
  mode: "development",
});

app.use(cors(
  {
    origin: ['http://localhost:5173', 'https://admin.socket.io'],
    methods: "*",
    allowedHeaders: ["Access-Control-Allow-Origin", "Content-Type", "Authorization"],
    credentials: true,
  }
));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: sessionStore,
  cookie: {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
}));

app.use(passport.initialize());

// both are same
app.use(passport.session());
// app.use(passport.authenticate('session'));

// protects all routes
// app.use(passport.authenticate('session')); //basic local session token bearer provider openid

app.use((req, res, next) => {
  // console.log("req.session", req.session);
  console.log("session ID :", req.sessionID);
  console.log("user name  :", req.user?.name);
  // console.log("req.isAuthenticated()", req.isAuthenticated());
  next();
});

// app.use("/", express.static(path.join(process.cwd(), "public")));

app.use('/', routes);

httpServer.listen(port, () => {
  console.log(`----------> Express server app - rivendell - running on port ${port}`.bgGreen);
});

export default app;
