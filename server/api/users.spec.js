// /* global describe beforeEach it */

// const { expect } = require('chai');
// const request = require('supertest');
// const {
//   db,
//   models: { User },
// } = require('../db');
// const seed = require('../../script/seed');
// const app = require('../app');

// describe('User routes', () => {
//   beforeEach(async () => {
//     await seed();
//   });

//   describe('/api/users/', () => {
//     it('GET /api/users', async () => {
//       const res = await request(app).get('/api/users').expect(200);

//       expect(res.body).to.be.an('array');
//     });
//   }); // end describe('/api/users')
// }); // end describe('User routes')
