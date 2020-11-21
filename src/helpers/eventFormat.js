export const googleEvent={
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2',
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};
