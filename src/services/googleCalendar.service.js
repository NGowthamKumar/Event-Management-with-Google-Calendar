import fs from 'fs';
import {SCOPES, TOKEN_PATH} from '../constants/constants';
import {google} from 'googleapis';
import {googleEvent} from '../helpers/eventFormat';

/**
 * Google calendar class
 */
export class GoogleCalendar {
  /**
    * @constructor
    */
  constructor() {
    if (!GoogleCalendar._credentials) {
      const content = fs.readFileSync(`${__dirname}/../../src/constants/credentials.json`);
      GoogleCalendar._credentials = JSON.parse(content);
    }
  }

  /**
   * Authorise google users
   *
   * @return {Promise}
   */
  authorize() {
    // eslint-disable-next-line camelcase
    const {client_secret, client_id, redirect_uris} = GoogleCalendar._credentials.web;
    GoogleCalendar.oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    return new Promise((resolve, reject) => {
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
          return this.getAccessToken(GoogleCalendar.oAuth2Client, (concentPageGoogle)=>{
            resolve(concentPageGoogle);
          });
        }
        GoogleCalendar.oAuth2Client.setCredentials(JSON.parse(token));
        // GoogleCalendar.oAuth2Client.setCredentials({
        //   access_token: user[0].access_token,
        //   refresh_token: user[0].refresh_token,
        //   expiry_date: true,
        // });
        resolve('A_GEN');
      });
    });
  }

  /**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
  getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    callback(authUrl);
  }

  /**
   * create auth after google oath completes ( token generation )
   *
   * @param {String} code
   * @return {Promise}
   */
  createAuth(code) {
    return new Promise((resolve, reject) => {
      GoogleCalendar.oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        GoogleCalendar.oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return reject(err);
          resolve(TOKEN_PATH);
        });
      });
    });
  }

  /**
   * list all calendar events from google
   */
  listEvents() {
    const calendar = google.calendar({version: 'v3', auth: GoogleCalendar.oAuth2Client});
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        console.log('Upcoming events:');
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    });
  }
  /**
 * To create an event in google calender
 * @param {Object} event
 * @return {romise}
 */
  CreateGoogleEvent(event) {
    const Eventt = {...event, ...googleEvent};
    const calendar = google.calendar({version: 'v3', auth: GoogleCalendar.oAuth2Client});
    return new Promise((resolve, reject) => {
      calendar.events.insert({
        auth: GoogleCalendar.oAuth2Client,
        calendarId: 'primary',
        resource: Eventt,
      }, (err, response)=>{
        if (err) reject(err);
        else resolve(response);
      });
    });
  }

  /**
   *
   * @param {Object} event
   * @return {Promise}
   */
  updateEvent(event) {
    console.log(event);
    const EventId = event.id;
    const calendar = google.calendar({version: 'v3', auth: GoogleCalendar.oAuth2Client});
    return new Promise((resolve, reject) => {
      calendar.events.update({
        auth: GoogleCalendar.oAuth2Client,
        calendarId: 'primary',
        eventId: EventId,
        resource: event,
      }, (err, response)=>{
        if (err) reject(err);
        else resolve(response);
      });
    });
  }
  /**
 * @param {String}googleId
 * @return {Object}
 */
  deleteEvent(googleId) {
    const calendar = google.calendar({version: 'v3', auth: GoogleCalendar.oAuth2Client});
    return new Promise((resolve, reject) => {
      calendar.events.delete({
        auth: GoogleCalendar.oAuth2Client,
        calendarId: 'primary',
        eventId: googleId,
      }, (err, response)=>{
        if (err) reject(err);
        else resolve(response);
      });
    });
  }
}
