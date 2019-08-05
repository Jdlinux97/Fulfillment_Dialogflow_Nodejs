const express = require('express')


require('dotenv').config()
const routes = require('./routes')
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(routes)

app.listen(process.env.PORT, process.env.IP);

// Desarrollo
if (process.env.NODE_ENV == 'develop') {
    const ngrok = require('ngrok');
    (async function () {
        const url = await ngrok.connect(process.env.PORT);
        console.log(url);
    })();
}
