const db = require('../dbConfig/init');
const bcrypt = require("bcrypt")

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
}

module.exports = User;