const db = require('../dbConfig/init');
const User=require('./users')
class Habit {

    constructor(data,user){
        this.id = data.id;
        this.habit = data.habit;
        this.frequency = data.frequency;
        this.streak=data.streak;
        this.user = { name: data.name, path: `/users/${data.user_id}`};

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
   
}


module.exports=Habit;