const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const testCases = [
  // positive test case
  {
    input: {

      'name': 'GowthamKumar',
      'password': 'mahtwog',
      'number': 8248378490,
      'email': 'GowthamKumar@gmail.com',
      'type': 'TeamLead/Manager',
      'team': 'JS Team',

    },
    expectedStatus: 200,
    expectedProperty: 'Success',
  }, {
    input: {
      'name': 'gowthamkumar',
      'password': 'mahtwog',
      'number': 8248378490,
      'email': 'gowthamkumar@gmail.com',
      'type': 'TeamLead/Manager',
      'team': 'JS Team',
    },
    expectedStatus: 200,
    expectedProperty: 'Success',
  },
  // negative test cases
  {
    input: {
      'name': 'gowthamkumar',
      'password': 'mahtwog',
      'number': 8248378490,
      'email': 'wrongEmailId',
      'type': 'TeamLead/Manager',
      'team': 'JS Team',
    },
    expectedStatus: 400,
    expectedProperty: 'Client_error',
  },
];

describe('Mocha test', ()=>{
  testCases.forEach((cases)=>{
    it(`User Register ${JSON.stringify(cases)}`, (done)=>{
      chai.request('localhost:8000')
          .post('/user/register')
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
