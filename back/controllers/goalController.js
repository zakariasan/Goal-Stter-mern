const Goal = require("../model/Goal");
//desc		get Goals
//@route	GET /api/goals
//@access	Private
const getGoals = async (req, res) => {
	try {
		const goals = await Goal.find({userId:req.user.id});
		res.status(200).json(goals);
	} catch (err) {
		console.log(err);
	}
};

//desc		set Goal
//@route	POST /api/goals
//@access	Private
const postGoal = async (req, res) => {
	try {
		if (!req.body.goal) {
			res.status(400);
			throw new Error("Please add a text field!!!");
		}
		console.log(req.user)
		const goal = await Goal.create({
			goal: req.body.goal,
			start: req.body.start,
			end: req.body.end,
			color:req.body.color,
			userId:req.user.id
		});
		console.log(goal, req.usses )
		res.status(200).json(goal);
	} catch (err) {
		console.log(err);
	}
};

//desc		update Goal
//@route	PUT /api/goal
//@access	Private
const updateGoal = async (req, res) => {
	try {
		const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json(goal);
	} catch (err) {
		console.log(err);
		res.status(400);
		throw new Error("Goal not found !!");
	}
};

//desc		delete Goal
//@route	DELETE /api/goal
//@access	Private
const deleteGoal = async (req, res) => {
	try {
		const goal = await Goal.findByIdAndDelete(req.params.id);

		res.status(200).json(goal);
	} catch (err) {
		console.log(err);
		res.status(400);
		throw new Error("Goal not found !!");
	}
};

module.exports = {
	getGoals,
	postGoal,
	updateGoal,
	deleteGoal,
};
