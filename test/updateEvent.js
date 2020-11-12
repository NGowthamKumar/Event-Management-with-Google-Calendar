const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const testCases = [
  // positive test case
  {
    input: {
      _id: '5facd438f202f37e3cd28dd5',
      event_name: 'newww Event modified',
      event_description: 'SampleDescription',
      event_members: ['123@gmail', '456@gmail'],
      event_date: '2019-5-23',
      event_duration: 2,
    },
    expectedStatus: 200,
    expectedProperty: 'Event updated',
  },
  {input: {
    _id: '5facd438f202f37e3cd28dd5',
    event_name: 'newww Event modified',
  },
  expectedStatus: 200,
  expectedProperty: 'Event updated'},

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
    expectedProperty: 'Can\'t update Event',
  },
  {
    input: {
      event_name: '123456789',
      event_description: 'description',
      event_members: ['123', '456'],
      event_date: 2020-12-12,
      event_duration: 'duration',
    },
    expectedStatus: 500,
    expectedProperty: 'Can\'t update Event',
  },
  {
    input: {
      event_id: 'wrong one',
      event_name: 'event1',
      event_description: 'description',
    },
    expectedStatus: 500,
    expectedProperty: 'Can\'t update Event',
  },
];

describe('Mocha test', ()=>{
  testCases.forEach((cases)=>{
    it(`Get user list ${JSON.stringify(cases)}`, (done)=>{
      chai.request('localhost:8000')
          .put('/v1/updateEvent')
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
