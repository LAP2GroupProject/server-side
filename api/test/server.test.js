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


    it("Reponds to a GET request at '/' with a 200 status", (done) => {
        request(api).get("/").expect(200, done);
    })





   
      
  


    
	


        });

        

      
           
         
    


