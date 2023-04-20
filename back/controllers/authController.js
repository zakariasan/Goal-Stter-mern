const Goal = require("../model/Goal");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
//desc		Login
//@route	POST /api/login
//@access	Private
const login = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;

		if (!user) res.send("No User Exists");
		else {
			req.logIn(user, (err) => {
				if (err) {
					throw err;
				}
				//res.send("Successfully Authenticated");
				res.send(req.user)
				//res.redirect('/')
				//console.log(req.user);
			});
		}
	})(req, res, next);
};

//desc		register
//@route	POST /api/register
//@access	Private
const register = async (req, res) => {
	const { name, password } = req.body;

	if (password.length < 3) {
		res.send("Password must be at least 6 characters");
	} else {
		try {
			const user = await User.findOne({ name: name });
			if (user) {
				res.status(409).json({ msg: "Email already exists" });
			} else {
				const hashedPass = await bcrypt.hash(password, 10);
				const avatar = `https://api.multiavatar.com/${name}.svg`
				const newUser = new User({
					name,
					avatar,
					password: hashedPass,
				});
				await newUser.save();
				//res.send("New User Created .....!!!");
				res.redirect('/')
			}
		} catch (err) {
			console.log(err);
		}
		console.log(req.body);
	}
};

//desc		get user info
//@route	PUT /api/user
//@access	Public
const user = async(req, res) => {
	try {
		const users = await User.find();
		//users = users.map(a=> )
		res.status(200).json(users);
	} catch (err) {
		console.log(err);
	}
};

const logout = (req, res)=> {

 req.logout()
	req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.send({ message: 'Successfully logged out' })
		res.redirect('/login')
    })


}
module.exports = {
	login,
	register,
	user,
	logout
};
