import io from '../sockets.js';

async function login (req, res, next) { //signin
	console.log(5555555555, req.body, req.user);

	//req.user is set by passport in src/strategies/local.js verify function if the user is authenticated successfully
	if(req.isAuthenticated()) {
		res.status(200).json({ user: req.user });
	} else {
		res.status(401).json({ message: 'Unauthorized!' });
	}
}
function logout (req, res) { //signout
	const sessionId = req.session.id;
	req.logout();
  req.session.destroy(() => {
    // disconnect all Socket.IO connections linked to this session ID
    io.in(sessionId).disconnectSockets();
		res.status(200).json({ message: 'logout successful!' });
  });
}
function isAuthenticated (req, res) {
	if(req.isAuthenticated()) {
		res.status(200).json({ user: req.user });
	} else {
		res.status(401).json({ message: 'Unauthenticated!' });
	}
}

export default { login, logout, isAuthenticated }
