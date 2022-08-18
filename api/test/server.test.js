const request =  require('supertest')

const app=require('../server')

describe ("API", () => {
    let api;

    beforeAll(() => {
        api = app.listen(3000);
    })

    afterAll((done) => {    
        api.close(done)
    })


   
    
        });

        

      
           
         
    


