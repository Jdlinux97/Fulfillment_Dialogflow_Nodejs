const express = require('express');
const router = express.Router();


const mathematic = require('../actions/matematica');
const recordatorio = require('../actions/recordatorio');

router.get('/', (req, res)=>{
    res.json({
        status:'corriendo'
    })
})

router.post('/', async (req, res) => {
    let response;
    if (req.body.queryResult.action == "suma") {
        const num1 = parseFloat(req.body.queryResult.parameters.number);
        const num2 = parseFloat(req.body.queryResult.parameters.number1);
        response = await mathematic.suma(num1, num2)
    }

    if (req.body.queryResult.action == "recordatorio") {
        const {date, time}=req.body.queryResult.parameters
        response = await recordatorio.create(date, time)
    }


    res.json({
        "fulfillmentText": response
    });
});



module.exports = router;