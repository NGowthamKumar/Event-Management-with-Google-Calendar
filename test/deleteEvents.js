const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const testCases = [
  // positive test case
  {
    input: {
      _id: '5facf4f3d47c08915452a405',

    },
    expectedStatus: 200,
    expectedProperty: 'Event deleted',
  },
  // negative test cases
  {
    input: {
      _id: 'gowtham',
    },
    expectedStatus: 500,
    expectedProperty: 'Can\'t delete Event',
  },
  {
    input: {
      _id: '123456789',
    },
    expectedStatus: 500,
    expectedProperty: 'Can\'t delete Event',
  },
];

describe('Mocha test', ()=>{
  testCases.forEach((cases)=>{
    it(`Get user list ${JSON.stringify(cases)}`, (done)=>{
      chai.request('localhost:8000')
          .delete(`/v1/deleteEvent/${cases.input._id}`)
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
