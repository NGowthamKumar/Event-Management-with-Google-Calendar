const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const testCases = [
  // positive test case
  {
    input: {
      'password': 'mahtwog',
      'emailId': 'GowthamKumar@gmail.com',
    },
    expectedStatus: 200,
    expectedProperty: 'Success',
  }, {
    input: {
      'password': 'mahtwog',
      'emailId': 'gowthamkumar@gmail.com',
    },
    expectedStatus: 200,
    expectedProperty: 'Success',
  },
  // negative test cases
  {
    input: {
      'password': 'mahtwog',
      'emailId': 'wrongEmailId',
    },
    expectedStatus: 400,
    expectedProperty: 'Client_error',
  },
];

describe('Mocha test', ()=>{
  testCases.forEach((cases)=>{
    it(`User Login ${JSON.stringify(cases)}`, (done)=>{
      chai.request('localhost:8000')
          .post('/user/login')
          .send(cases.input)
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
