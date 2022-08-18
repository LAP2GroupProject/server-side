const Habit = require('../models/habits')

async function habitIndex (req, res) {
    try {
        const habits = await Habit.all(req);
        res.status(200).json(habits);
    } catch (err) {
        res.status(500).json({err})
    }
}

async function create (req, res) {
    try {
        //console.log(req)
        const addHabit = await Habit.create(req);
        res.status(201).json(addHabit);
    } catch (err) {
        res.status(422).json({err})
    }
}

async function getHabits (req, res) {
    try {
        const habits = await Habit.allByUserId(parseInt(req.params.id))
        res.status(200).json(habits)
    } catch (err) {
        res.status(404).json({err})
    }
}

async function completeHabit (req, res) {
    try {
        
    } catch (err) {
        res.status(500).json({err})
    }
}

// get habits by id from habits table
async function getHabitsById(req, res) {
    try {
        const habitsById = await Habit.habitStreaksById(parseInt(req.params.id))
        console.log("habitsById ==> ", habitsById);
        res.status(200).json(habitsById)
    } catch (err) {
        console.log("HERE!!");
        res.status(404).json({err})
    }
}

module.exports={habitIndex, create, getHabits, completeHabit, getHabitsById}