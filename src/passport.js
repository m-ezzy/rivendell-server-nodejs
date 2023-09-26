import passport from "passport";
import passportLocalStrategy from "./strategies/local.js";
import { UserModel } from "./models/User.js";

//Serialization is the process of converting an object into a stream of bytes
//sets the user's ID as a cookie in the browser
//runs only once on login and the user's data is stored in the session store
passport.serializeUser((user, done) => {
	// console.log("serialize............", user);

  // process.nextTick(() => {
    done(null, { id: user._id, name: user.name, email: user.email });
		// the second argument is stored here ---> req.session.passport.user = {};
  // });
});

//Deserialization is the reverse process of constructing a data structure or object from a series of bytes
//retrieves the user's ID from the cookie
//runs on every request after login and the user's data is copied from session store into req.user
passport.deserializeUser((userPara, done) => {
	// console.log("deserialize............", userPara);

	done(null, userPara);

	// UserModel
	// .findById(id, (err, user) => {
	// 	done(null, {
	// 		id: user._id,
	// 		name: user.name,
	// 		email: user.email,
	// 	});
	// })
	
	// UserModel
	// .findOne({ _id: userPara.id }, "-password -salt")
	// .then((user) => {
	// 	console.log("deserialize", user);
	// 	if (!user) {
	// 		return done(null, false);
	// 	}
	//   return done(null, { ...user, hashedPassword: undefined, salt: undefined });
	// 	// the second argument is stored here ---> req.user = {};
	// })
	// .catch((err) => {
	// 	return done(err);
	// });
});

// use the local strategy in the app and name it "local". to use it, call passport.authenticate("local") on the routes you want to protect
passport.use("local", passportLocalStrategy);

export default 1;
