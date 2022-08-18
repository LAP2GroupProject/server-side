const request =  require('supertest')
//const app = require("../app.js")
//const each = require('jest-each').default;
const app=require('../../controllers/users')

describe ("API", () => {
    let api;

    beforeAll(() => {
        api = app.listen(3000);
    })

    afterAll((done) => {    
        api.close(done)
    })


    it("Reponds to a GET request at '/' with a 200 status", (done) => {
        request(api).get("/").expect(200, done);
    })





    it("Responds to a Get request at '/posts' with a 200 status", (done) => {
        request(api).get("/habits").expect(200, done);
    })
   

    it("Responds to a Get request at '/comments' with a 200 status", (done) => {
        request(api).get("/users").expect(200, done);
    })
   
    
    it("Responds to a GET request at '/comments' with a json object", (done) => {
        request(api).get('/posts')
       
     
        .expect('Content-Type', /json/)
        .expect(200, done);
        });

    it("Responds to a GET request at '/comments' with a json object", (done) => {
            let data = JSON.stringify({ id: 1234 });
            request(api).get('/posts')
            .expect(validateData(data)).toMatchObject({ id: "1234" }).expect(res.statusCode).toBe(200);
    });
   
   
    
	


        });

            
            
           
         
    


