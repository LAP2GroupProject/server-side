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
                const userData = await db.query(`SELECT * FROM user_account WHERE username = $1;`, [username]);
                const user = new User(userData.rows[0]);
                resolve(user);
            } catch (err) {
                console.log(err);
                reject('Unable to locate user. Please try again');
            }
        })
    }
   
}


module.exports=User;
