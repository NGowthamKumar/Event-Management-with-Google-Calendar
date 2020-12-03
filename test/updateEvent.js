const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const testCases = [
  // positive test case
  {
    input: {
      '_id': '5fc8b00b05a41384cd968257',
      'emailId': 'GowthamKumar@gmail.com', // TeamLead/Manager mail
      'summary': 'Tech modified Meeting',
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
  {
    input: {
      '_id': '5fc8b00b05a41384cd968257',
      'emailId': 'GowthamKumar@gmail.com', // Not a TeamLead/Manager mail
      'summary': 'Tech half Modified Meeting',
      'location': 'Sparkout Tech Solutions',
      'description': 'To Share Tech News and Daily Events',
      'attendees': ['gowthamkumar21011999@gmail.com'],
      'event_duration': 2,
      'start': {'dateTime': '2020-12-07T08:00:00+05:30', 'timeZone': 'Asia/Kolkata'},
      'end': {'dateTime': '2020-12-08T10:00:00+05:30', 'timeZone': 'Asia/Kolkata'},
    },
    expectedStatus: 200,
    expectedProperty: 'Success',
  },
  {input: {
    '_id': '5fc73e8e28dc851ce4242aff',
    'emailId': 'gowtham@gmail.com', // Not a TeamLead/Manager mail
    'summary': 'Tech modified Meeting',
    'location': 'sparkout',
    'description': 'To share tech news and daily events',
    'attendees': ['gowthamkumar21011999@gmail.com', 'gowthamkumarnram@gmail.com'],
    'event_duration': 2,
    'start': {'dateTime': '2020-12-04T07:00:00+05:30', 'timeZone': 'Asia/Kolkata'},
    'end': {'dateTime': '2020-12-05T10:00:00+05:30', 'timeZone': 'Asia/Kolkata'},
  },
  expectedStatus: 400,
  expectedProperty: 'Client_error'},

  // negative test cases
  {
    input: {
      '_id': 'wrongMongodbId',
      'emailId': 'gowthamkumar21011999@gmail.com', // a TeamLead/Manager mail
      'summary': 'Tech modified Meeting',
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
    it(`To update an event ${JSON.stringify(cases)}`, (done)=>{
      chai.request('localhost:8000')
          .put('/event/updateEvent')
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
