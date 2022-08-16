const db = require('../dbConfig/init');

class User {

    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password=data.password;
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

    static async create(userData) {
        return new Promise (async (resolve, reject) => {
            try {
                const { username, email, password} = userData;

                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds)
                const hash = await bcrypt.hash(password, salt);

                let result = await db.query(
                    `INSERT INTO users (name, email, password) VALUES ($1, $2. $3) RETURNING *;`, [username, email, password]
                );

                resolve(new User (result.rows[0]));
            } catch(err){
                reject(`User could not be created.`)
            }
        })
    }

    // static async register(userData) {
    //     return new Promise (async (resolve, reject) => {
    //         try {
    //             const { name, email, password} = userData;

               
               
    //            let postData = await db.query(`INSERT INTO users (name,email, password) VALUES ($1, $2, $3) RETURNING *;`, [ name, email, hash ]);

    //             let addUser = new User(postData.rows[0]);
    //             resolve (addUser);
    //         } catch(err){
    //             reject(`User could not be created.`)
    //         }
    //     })
    // }

   
}


module.exports=User;
