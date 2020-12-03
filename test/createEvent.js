const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const testCases = [
  // positive test case
  {
    input: {
      'emailId': 'GowthamKumar@gmail.com', // its a TeamLead/Manager mail
      'summary': 'Tech Meeting',
      'location': 'sparkout',
      'description': 'To share tech news and daily events',
      'attendees': ['gowthamkumar21011999@gmail.com', 'gowthamkumarnram@gmail.com'],
      'event_duration': 2,
      'start': {'dateTime': '2020-12-04T07:00:00+05:30', 'timeZone': 'Asia/Kolkata'},
      'end': {'dateTime': '2020-12-05T10:00:00+05:30', 'timeZone': 'Asia/Kolkata'},
    },
    expectedStatus: 200,
    expectedProperty: 'Success',
  },
  // negative test cases
  {
    input: {
      'emailId': 'gowtham@gmail.com', // Not a TeamLead/Manager mail
      'summary': 'Tech Meeting',
      'location': 'sparkout',
      'description': 'To share tech news and daily events',
      'attendees': ['gowthamkumar21011999@gmail.com', 'gowthamkumarnram@gmail.com'],
      'event_duration': 2,
      'start': {'dateTime': '2020-12-04T07:00:00+05:30', 'timeZone': 'Asia/Kolkata'},
      'end': {'dateTime': '2020-12-05T10:00:00+05:30', 'timeZone': 'Asia/Kolkata'},
    },
    expectedStatus: 400,
    expectedProperty: 'Client_error',
  },
  {
    input: {
      'emailId': '2101com', // Wrong mail
      'summary': 'Tech Meeting',
      'location': 'sparkout',
      'description': 'To share tech news and daily events',
      'attendees': ['gowthamkumar21011999@gmail.com', 'gowthamkumarnram@gmail.com'],
      'event_duration': 2,
      'start': {'dateTime': '2020-12-04T07:00:00+05:30', 'timeZone': 'Asia/Kolkata'},
      'end': {'dateTime': '2020-12-05T10:00:00+05:30', 'timeZone': 'Asia/Kolkata'},
    },
    expectedStatus: 400,
    expectedProperty: 'Client_error',
  },
];

describe('Mocha test', ()=>{
  testCases.forEach((cases)=>{
    it(`Create Event ${JSON.stringify(cases)}`, (done)=>{
      chai.request('localhost:8000')
          .post('/event/createEvent')
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
