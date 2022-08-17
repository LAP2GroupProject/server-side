const db = require('../dbConfig/init');
// const User=require('./users')
class Habit {

    constructor(data, user){
        this.id = data.id;
        this.habit = data.habit;
        this.frequency = data.frequency;
        this.streak=data.streak;
       // this.user_id = { name: data.name, path: `/users/${data.user_id}`};
        this.user_id = data.user_id;
    }

    // get all habits
    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const habitData = await db.query('select * from habits;')
                const habits = habitData.rows.map(h => new Habit(h))
                resolve(habits);
            } catch (err) {
                reject("Error retrieving habits")
            }
        })
    }

    static async allByUserId(id) {
        return new Promise (async (resolve, reject) => {
            try {
                const habitData = await db.query('SELECT * FROM habits WHERE user_id = $1;', [ id ])
                const habits = habitData.rows.map(h => new Habit(h))
                resolve(habits);
                
            } catch (err) {
                reject("Error retrieving habits")
            }
        })
    }

    //create a habit
    static async create(habit, frequency, user_id){
        return new Promise (async (resolve, reject) => {
            try {
                let result = await db.query(`INSERT INTO habits (habit, frequency, streak, user_id) VALUES ($1, $2, $3, $4) RETURNING *;`, [ habit, frequency, 0, user_id ]);
                resolve (result.rows[0]);
            } catch (err) {
                reject('habit could not be created');
            }
        });
    };


    // Pulling habit by id using sql query
    static async habitStreaksById(id){
        return new Promise (async (resolve, reject) => {
            try {
                const habitStreaks = await db.query('SELECT * FROM habits WHERE id = $1;', [ id ]);
                const userHabits = habitStreaks.rows.map(h => new Habit(h));
                resolve(userHabits);
                
            } catch (err) {
                reject("Error retrieving user's habits");
            }
        })
    }
   
}

module.exports = Habit;
