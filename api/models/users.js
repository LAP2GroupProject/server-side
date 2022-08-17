const db = require('../dbConfig/init');
const bcrypt = require("bcrypt")
const jwt = require ("jsonwebtoken");
const Habit = require("../models/habits")
const extractID = require("./extract")
class User {

    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
    }


    // get all users
    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const userData = await db.query('select * from users;')
                const users = userData.rows.map(u => new User(u))
                resolve(users);
                
            } catch (err) {
                reject("Error retrieving users")
            }
        })
    }

    static findUserById(id) {
        return new Promise (async (resolve, reject) => {
            try {
                const userData = await db.query(`SELECT * FROM users WHERE id = $1;`, [ id ])
                const user = new User(userData.rows[0]);
                resolve(user)
            } catch (err) {
                console.log(err)
                reject("That user does not exist.")
            }
        })
    }

    static getOneByUsername(username) {
        return new Promise (async (resolve, reject) => {
            try {
                const userData = await db.query(`SELECT * FROM users WHERE name = $1;`, [username]);
                const user = new User(userData.rows[0]);
                resolve(user);
            } catch (err) {
                console.log(err);
                reject('Unable to locate user. Please try again');
            }
        })
    }

    static async register(name, email, password) {
        return new Promise (async (resolve, reject) => {
            try {
                const saltRounds = 10;

                const salt = await bcrypt.genSalt(saltRounds);
                const hash = await bcrypt.hash(password, salt);

                let result = await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, [name, email, hash]);
                const user = new User(result.rows[0])
                resolve(user);
            } catch(err){
                reject(`User could not be created.`)
            }
        })
    }

    static async findHabits(data) {
        return new Promise (async (resolve, reject) => {
            try {
                const id = await extractID(data.headers.authorization)

                const habits = await db.query(`SELECT * FROM habits WHERE user_id = $1;`, [ id ])
                const response = habits.rows.map(h => new Habit(h));
                resolve(response)
            } catch (err) {
                reject(err)
            }
        })
    }

    static async findUncompletedHabits(data) {
        return new Promise (async (resolve, reject) => {
            try {
                const id = await extractID(data.headers.authorization)

                const habits = await db.query(`SELECT * FROM habits WHERE user_id = $1 AND completetoday = $2;`, [ id, false ])
                const response = habits.rows.map(h => new Habit(h));
                resolve(response)
            } catch (err) {
                reject(err)
            }
        })
    }

    static async completeHabit(data) {
        return new Promise (async (resolve, reject) => {
            try {
                const id = await extractID(data.headers.authorization)
                //console.log(data.body)
                const updatedHabit = await db.query(`UPDATE habits SET completetoday='true', streak=streak+1 WHERE user_id = $1 AND habit = $2 RETURNING *;`, [ id, data.body.habit ])
                const completedHabit = updatedHabit.rows[0]
                console.log(completedHabit)
                resolve(completedHabit)
            } catch (err) {
                reject(err)
            }
        })
    }

}

module.exports = User;