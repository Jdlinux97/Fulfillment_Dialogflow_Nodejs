const fn ={};

async function sum(num1, num2){
    const sum = num1 + num2;
    return `${num1} + ${num2} es ${sum}`
    
}

async function subtraction(num1, num2){
    const subtraction = num1 - num2;
    return `${num1} - ${num2} es ${subtraction}`       
        
}

async function multiplication(num1, num2){
    const multiplication = num1 * num2;
    return `${num1} * ${num2} es ${multiplication}`
        
}

async function spli(num1, num2){
    const split = num1 / num2;
    return `${num1} / ${num2} es ${split}`
        
}

fn.sum = sum;
fn.subtraction = subtraction;
fn.multiplication = multiplication;
fn.spli = spli;

module.exports = fn;