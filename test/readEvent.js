const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const testCases = [
  // positive test case
  {
    input: {
      _id: '5facd4d6f11bdd7ed4da60ea',

    },
    expectedStatus: 200,
    expectedProperty: 'Success',
  },
  // negative test cases
  {
    input: {
      _id: 'gowtham',
    },
    expectedStatus: 400,
    expectedProperty: 'Client_error',
  },
  {
    input: {
      _id: '123456789',
    },
    expectedStatus: 400,
    expectedProperty: 'Client_error',
  },
];

describe('Mocha test', ()=>{
  testCases.forEach((cases)=>{
    it(`To get an event details ${JSON.stringify(cases)}`, (done)=>{
      chai.request('localhost:8000')
          .get(`/event/readEvent/${cases.input._id}`)
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
