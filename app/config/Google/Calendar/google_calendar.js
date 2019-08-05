const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.events.readonly',
  'https://www.googleapis.com/auth/calendar.settings.readonly',
  'https://www.googleapis.com/auth/calendar.addons.execute'
];


const TOKEN_PATH = `${__dirname}/token.json`;

const fn = {};

function accesvalidate() {
  try {
    const content = fs.readFileSync(`${__dirname}/credentials.json`)
    return authorize(JSON.parse(content));
  } catch (error) {
    return `Error loading client secret file: ${error}`;
  }
}

function authorize(credentials) {
  

  const { client_secret, client_id, redirect_uris } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);


    try {
      const token=  fs.readFileSync(TOKEN_PATH);
      oAuth2Client.setCredentials(JSON.parse(token))
      return oAuth2Client
    } catch (error) {
      return getAccessToken(oAuth2Client)
    }

 
}

function getAccessToken(oAuth2Client) {
  

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  const resp = rl.question('Enter the code from that page here: ', (code) => {
    rl.close();

    oAuth2Client.getToken(code, (err, token) => {
      if (err) return `Error retrieving access token ${err}`

      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return `${err}`;
        return `Token stored to ${TOKEN_PATH}`
      });

      return oAuth2Client
    });

  });
  return resp
}


fn.accesvalidate = accesvalidate;

module.exports = fn;