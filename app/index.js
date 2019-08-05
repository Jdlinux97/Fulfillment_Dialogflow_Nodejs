const express = require('express')


require('dotenv').config()
const routes = require('./routes')
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(routes)

if (process.env.NODE_ENV == 'production') {
    app.listen(process.env.PORT, () => {
        console.log(`Service up in the port ${process.env.PORT}`)
    })
}

// Desarrollo
if (process.env.NODE_ENV == 'develop') {
    app.listen(process.env.PORT, process.env.IP);

    const ngrok = require('ngrok');
    (async function () {
        const url = await ngrok.connect(process.env.PORT);
        console.log(url);
    })();
}
