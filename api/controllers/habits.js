const Habit = require('../models/habits')

async function habitIndex (req, res) {
    try {
        const habits = await Habit.all;
        res.status(200).json(habits);
    } catch (err) {
        res.status(500).json({err})
    }
}

async function create (req, res) {
    try {
        const addHabit = await Habit.create(req.body.habit, req.body.frequency, req.body.streak, req.body.user_id);
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

module.exports={habitIndex, create, getHabits}