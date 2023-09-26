import { Router } from 'express';
import passport from 'passport';
import authController from '../controllers/auth.js';
// import { signup, login } from '../controllers/auth.js';

let authRouter = Router();

// authRouter.post("/signup", authController.signup);
authRouter.post("/login", passport.authenticate('local'), authController.login);
// authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

export default authRouter;

// passport.authenticate('local', (err, user, info) => {
		// if (err) {
			// return next(err);
		// }

		// if (!user) {
		//   return res.status(400).json({ error: info });
		// }

		// req.logIn(user, (err) => {
			// if (err) {
				// return next(err);
			// }

			// const token = await jwt.sign({id: user.id }, process.env.SECRET);

			// res.json({
			// 	message: "User logged in successfully!",
			// 	token,
			// });

			// return res.status(200).json({ message: 'Login successful!' });
			// return res.status(200).json({ user: req.user });
		// });
	// });
// })(req, res, next);
