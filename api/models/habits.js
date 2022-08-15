const db = require('../dbConfig/init');

class Habit {

    constructor(data){
        this.id = data.id;
        this.habitName = data.habitName;
        this.frequency = data.frequency;
        this.streak=data.streak;
        this.lastComplete=data.lastComplete;
        this.user_id=data.user_id;
    }


    // get all habits
    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const habitData = await db.query('select * from "habits";')
                const habits = habitData.rows.map(h => new Habit(h))
                resolve(habits);
                
            } catch (err) {
                reject("Error retrieving habits")
            }
        })
    }
   
}


module.exports=Habit;