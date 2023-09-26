import cookieParser from "cookie-parser";
import passport from "passport";
// import config from "../config.js";
import sessionStore from "./sessionStore.js";

// io.use((socket, next) => {
export default function (socket, next) {
	let requestHandler = cookieParser(process.env.SESSION_SECRET);
	
	requestHandler(socket.request, {}, (err) => {
		const sessionId = socket.request.signedCookies['connect.sid'];

		if (sessionId) {
			sessionStore.get(sessionId, (err, session) => {
				if (err) return next(err);
				if (!session) return next(new Error('session not found!'));
				socket.request.session = session;

				passport.initialize()(socket.request, {}, () => {
					passport.session()(socket.request, {}, () => {
						if (socket.request.user) {
							next(null, true);
						} else {
							next(new Error('user is not authenticated!'), false);
						}
					});
				});
			});
		} else {
			next(new Error('session ID not found!'));
		}
	});
}
