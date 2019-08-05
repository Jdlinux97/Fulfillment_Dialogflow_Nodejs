const fn ={};

async function sum(num1, num2){
    return num1 + num2;
}

async function subtraction(num1, num2){
    return num1 - num2;       
}

async function multiplication(num1, num2){
    return num1 * num2;
}

async function spli(num1, num2){
    return num1 / num2;   
}
async function squareroot(num1){
    return Math.sqrt(num1)
}

async function exponent(num1, num2){
    return Math.pow(num1, num2)
}

fn.sum = sum;
fn.subtraction = subtraction;
fn.multiplication = multiplication;
fn.spli = spli;
fn.squareroot = squareroot;
fn.exponent = exponent;

module.exports = fn;