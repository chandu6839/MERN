const Workout = require('../models/workout')
const mongoose = require('mongoose')
//get all

const getWorkouts = async (req, res) => {
	const workouts = await Workout.find({}).sort({createdAt: -1})

	res.status(200).json(workouts)
}

//get a single
const getWorkout = async (req, res) => {
	const { id } = req.params
	if(!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({error: 'no such id'})
	}
	const workout = await Workout.findById(id)
	if(!workout) {
		return res.status(400).json({error: 'no such workout id'})
	}
	res.status(200).json(workout)
}

//create
const createWorkout = async (req, res) => {
		const { title, reps, load } = req.body
		//add doc
	try {
		const workout = await Workout.create({title, reps, load})
		res.status(200).json(workout)
		//res.status(200).json({msg: 'post single workouts'})
	} catch (error) {
		console.log(error.message, 'error.message')
		res.status(400).json({error: error.message})
	}

}

//delete
const deleteWorkout = async (req, res) => {
	const { id } = req.params
	if(!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({error: 'no such id to delete'})
	}
	const workout = await Workout.findOneAndDelete({_id: id})
	if(!workout) {
		return res.status(400).json({error: 'no such workout id to delete'})
	}
	res.status(200).json(workout)
}


//update
const updateWorkout = async (req, res) => {
	const { id } = req.params
	const {title, reps, load} = req.body
	if(!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({error: 'no such id to update'})
	}
	const workout = await Workout.findOneAndUpdate({_id: id},{ ...req.body})
	if(!workout) {
		return res.status(400).json({error: 'no such workout id to update'})
	}
	res.status(200).json({ ...req.body})
}

module.exports = {
	createWorkout,
	getWorkouts,
	getWorkout,
	deleteWorkout,
	updateWorkout
}