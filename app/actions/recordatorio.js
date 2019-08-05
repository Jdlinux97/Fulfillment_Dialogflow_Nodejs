const AccesCalendar = require('../config/Google/Calendar/google_calendar');
const { google } = require('googleapis');
const moment = require('moment')
const tz = require('moment-timezone')

moment.locale('es');

const fn = {}


async function create(date, time) {
    const auth = await AccesCalendar.accesvalidate()
    const fechaSplit = date.split('T')
    const fecha = fechaSplit[0]

    const hourSplit = time.split('T')
    const hour = hourSplit[1]

    const start = `${fecha}T${hour}`
    // esto falla desde telegram
    const endHour = moment.tz(start, "America/Caracas").add(2, 'hours').format('HH:mm:ss');
    const end = `${fecha}T${endHour}-04:00`
    console.log(start)
    console.log(end)

    return await CreatEvent(auth, start, end)
}

function CreatEvent(auth, start, end) {
    const calendar = google.calendar({ version: 'v3', auth });
    let resp = true;
    var event = {
        'summary': 'Google I/O 2019',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': start,
            'timeZone': 'America/Caracas',
        },
        'end': {
            'dateTime': end,
            'timeZone': 'America/Caracas',
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
            { 'email': 'lpage@example.com' },
            { 'email': 'sbrin@example.com' },
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                { 'method': 'email', 'minutes': 24 * 60 },
                { 'method': 'popup', 'minutes': 10 },
            ],
        },
    };

    calendar.events.insert({
        calendarId: 'primary',
        resource: event,
    }, function (err, event) {
        if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            resp = false

        }
        //console.log('Event created: %s', event.htmlLink);
    });
    if (resp) {
        return 'El recordatorio fue creado exitosamente'
    } else {
        return 'Error intantalo mas tarde'
    }
}



async function show(date, time) {
    const auth = await AccesCalendar.accesvalidate()

    return await ShowEvent(auth)
}

function ShowEvent(auth) {
    const calendar = google.calendar({ version: 'v3', auth });

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
            console.log('Upcoming 10 events:');
            events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
            });
        } else {
            console.log('No upcoming events found.');
        }
    });
}

fn.create = create;

module.exports = fn;
