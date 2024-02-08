import request from 'supertest';
import server from 'nextjs-http-supertest';

describe('my super test suite', () => {

    afterAll(() => {
        server.close(); // don't forget to close your server after your tests
    })

    it('200: Should return a toto array', async () => {
        const r = await request(server).get('/api/toto').query({ offset: 0, limit: 10 });
        expect(r.statusCode).toEqual(200);
        expect(r.body.length).toEqual(10);
    })
})