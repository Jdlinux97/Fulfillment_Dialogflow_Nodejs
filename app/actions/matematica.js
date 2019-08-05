const fn ={};

async function suma(num1, num2){
    let sum = num1 + num2;
        response = `${num1} + ${num2} es ${sum}`
       
        return response 
}

fn.suma = suma;

module.exports = fn;