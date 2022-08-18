const db = require('../dbConfig/init');
const data = require("./users")
const extractID = require("./extract")
// const User=require('./users')
class Habit {

    constructor(data, user){
        this.id = data.id;
        this.habit = data.habit;
        this.frequency = data.frequency;
        this.streak=data.streak;
        this.lastComplete = data.lastComplete;
        this.completeToday = data.completetoday;
        this.lastCompleteDay = data.lastCompleteDay;
        this.user_id = data.user_id;
    }

    // get all habits
    static async all(data) {
        return new Promise (async (resolve, reject) => {
            try {
                const id = await extractID(data.headers.authorization)
                const habitData = await db.query('SELECT * FROM habits WHERE user_id=$1;', [ id ])
                const habits = habitData.rows.map(h => new Habit(h))
                resolve(habits);
            } catch (err) {
                reject("Error retrieving habits")
            }
        })
    }

    static async allByUserId(data) {
        return new Promise (async (resolve, reject) => {
            try {
                console.log(data)
                const habitData = await db.query('SELECT * FROM habits WHERE user_id = $1;', [ id ])
                const habits = habitData.rows.map(h => new Habit(h))
                resolve(habits);
                
            } catch (err) {
                reject("Error retrieving habits by id")
            }
        })
    }

    //create a habit
    static async create(data){
        return new Promise (async (resolve, reject) => {
            try {
                const id = await extractID(data.headers.authorization)
                //console.log(data.body)
                //console.log(id)
                let newData = await db.query(`INSERT INTO habits (habit, frequency, streak, completeToday, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [ data.body.habit, data.body.frequency, 0, false, id ]);
                //let newData = await db.query(`INSERT INTO habits (habit, frequency, streak, user_id) VALUES ($1, $2, $3, $4) RETURNING *;`, [ data.body.habit, data.body.frequency, 0, id ]);
                let newHabit = new Habit(newData.rows[0])
                //console.log(newData.rows[0])
                console.log(newHabit)
                resolve (newHabit);
            } catch (err) {
                reject('habit could not be created');
            }
        });
    };


    // Pulling habit by id using sql query
    static async habitStreaksById(id){
        return new Promise (async (resolve, reject) => {
            try {
                const habitStreaks = await db.query('SELECT * FROM habits WHERE user_id = $1;', [ id ]);
                console.log("habitStreaks ==> ", habitStreaks);
                const userHabits = habitStreaks.rows.map(h => new Habit(h));
                resolve(userHabits);
            } catch (err) {
                reject("Error retrieving user's habits");
            }
        })
    }
   
}

module.exports = Habit;
