const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		name:String,
		avatar:String,
		password:String
	}, {
		timestamps: true
	 }

	
)

module.exports = mongoose.model('user', userSchema)
