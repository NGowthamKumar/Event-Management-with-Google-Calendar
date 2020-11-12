const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const testCases = [
  // positive test case
  {
    input: {
      event_name: 'SampleEvent',
      event_description: 'SampleDescription',
      event_members: ['123@gmail', '456@gmail'],
      event_date: 2020-10-23,
      event_duration: 2,
    },
    expectedStatus: 200,
    expectedProperty: 'Event added',
  },
  // negative test cases
  {
    input: {
      event_name: 'gowtham',
      event_description: 'description',
      event_members: ['123', '456'],
      event_date: 2020-12-12,
      event_duration: 'duration',
    },
    expectedStatus: 500,
    expectedProperty: 'Error in adding events',
  },
  {
    input: {
      event_name: 'event1',
      event_description: 'description',
    },
    expectedStatus: 500,
    expectedProperty: 'Error in adding events',
  },
];

describe('Mocha test', ()=>{
  testCases.forEach((cases)=>{
    it(`Get user list ${JSON.stringify(cases)}`, (done)=>{
      chai.request('localhost:8000')
          .post('/v1/createEvent')
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
