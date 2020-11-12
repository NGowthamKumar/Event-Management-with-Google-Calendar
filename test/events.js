const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const testCases = [
  // positive test case
  {
    input: {
      'limit': 2,
      'page': 2,
    },
    expectedStatus: 200,
    expectedProperty: 'Got the event list',
    expectedLimit: 2,
    expectedPage: 2,
  },
];

describe('Mocha test', ()=>{
  testCases.forEach((cases)=>{
    it(`Get user list ${JSON.stringify(cases)}`, (done)=>{
      chai.request('localhost:8000')
          .get('/v1/events')
          .query({'limit': cases.input.limit, 'page': cases.input.page})
          .end((err, res)=>{
            if (err) {
              console.log('error');
            }
            chai.expect(res.status).to.equal(cases.expectedStatus);
            chai.expect(res.body).to.have.property(cases.expectedProperty);
            done();
          });
    });
  });
});
