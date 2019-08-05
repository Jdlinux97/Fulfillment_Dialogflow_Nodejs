const fn ={};

async function sum(num1, num2){
    const sum = num1 + num2;
    return `${sum}`
    
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

fn.sum = sum;
fn.subtraction = subtraction;
fn.multiplication = multiplication;
fn.spli = spli;

module.exports = fn;