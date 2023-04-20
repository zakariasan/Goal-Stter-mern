const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5555;
const app = express();
const db = require('./conf_db/db')
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs')
const session = require('cookie-session')


db();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(cors({
	origin: "http://localhost:3000", //React app location connect
	credentials:true
}))

//app.use(passport.initialize())
app.set('trust proxy',1)
app.use(session( {
	secret:"abdosecret",
	resave:"true",
	saveUninitialized:true,
	cookie:{
		secure:true,
		maxAge:10000
	}
   /* store:MongoStore.create({*/
		/*mongoUrl : process.env.MONGO_URI,*/
		/*collection : 'sessions'*/
	/*}),*/
}))

app.use(cookieParser("abdosecret")) //same secret of session
app.use(passport.initialize())
app.use(passport.session())
require('./conf_db/passport')(passport)
// Access the parse results as request.body
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/', require('./routes/authRoutes'))


app.listen(port, () => console.log(`====>Hosting on : ${port} `));
