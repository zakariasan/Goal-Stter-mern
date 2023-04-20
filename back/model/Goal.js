const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema(
	{
		goal: {
			type:String,
			require:true
		},
		color:{

			type:String
		},
		start: {

			type:Date,
			require:true,
			default: Date.now
		},
		end: {
			type:Date,
			require:true,
			default: Date.now
		},
		userId : {
			type:String,
			require:true

		}

	},{
			timestamp:true

		}
)

module.exports = mongoose.model('objectifs', goalSchema)
