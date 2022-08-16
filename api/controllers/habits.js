
const Habit = require('../models/habits')


async function habitIndex (req, res) {
    try {
        const habits = await Habit.all;
        
        res.status(200).json(habits);
    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports={habitIndex}
