const mongoose = require("mongoose");

const dataBase = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`Data Base connected  on @_@ : ${conn.connection.host}`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = dataBase;
