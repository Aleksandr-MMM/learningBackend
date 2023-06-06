import request from 'supertest'
import {app} from "../../src";


describe('endpoint /students', () => {
    beforeAll(async ()=>{
        await request(app).delete("/__test__/data")
    })

        it('should return 200 and empty arr', async () => {
           await request(app)
                .get('/students')
                .expect(200,[])
        })
    it('should return 404', async () => {
        await request(app)
            .post('/students/15523',)
            .expect(404)
    })

    it(`shouldn't create student and return 400`, async () => {
            await request(app)
                .post('/students')
                .send({name:''})
                .expect(400)
            await request(app)
                .get('/students')
                .expect(200,[])
        })

    it(`should create student and return 201`, async () => {
        const createResponse =await request(app)
            .post('/students')
            .send({name:'Alladin'})
            .expect(201)
            const createStudents=createResponse.body
            expect(createStudents).toEqual({
                id: expect.any(Number),
                name:'Alladin'
            })

    })
    }
)