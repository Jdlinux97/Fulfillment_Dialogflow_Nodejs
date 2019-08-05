const express = require('express');
const router = express.Router();


const mathematic = require('../actions/matematic');
const recordatorio = require('../actions/recordatorio');

router.get('/', (req, res) => {
    res.json({
        status: 'corriendo'
    })
})


router.post('/', async (req, res) => {
    
    let response;

    if (req.body.queryResult.action == "sum") {
        const {number, number1}=req.body.queryResult.parameters
        response = await mathematic.sum(number, number1)
    }
    if (req.body.queryResult.action == "subtraction") {
        const {number, number1}=req.body.queryResult.parameters
        response = await mathematic.subtraction(number, number1)
    }

    if (req.body.queryResult.action == "multiplication") {
        const {number, number1}=req.body.queryResult.parameters
        response = await mathematic.multiplication(number, number1)
    }

    if (req.body.queryResult.action == "split") {
        const {number, number1}=req.body.queryResult.parameters
        response = await mathematic.spli(number, number1)
    }

    if (req.body.queryResult.action == "squareroot") {
        const {number}=req.body.queryResult.parameters
        response = await mathematic.squareroot(number)
    }

    if (req.body.queryResult.action == "exponent") {
        const {number, number1}=req.body.queryResult.parameters
        response = await mathematic.exponent(number, number1)
    }

    if (req.body.queryResult.action == "createreminder") {
        const {date, time}=req.body.queryResult.parameters
        response = await recordatorio.create(date, time)
    }

    


    res.json({
        "fulfillmentText": response
    });
});



module.exports = router;