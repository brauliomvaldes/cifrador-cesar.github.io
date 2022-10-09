const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const inputOriginal = document.getElementById('input-original');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');

const shifMessage = ()=>{
    const wordArray = [...inputOriginal.value.toUpperCase()];
    printChar(0, wordArray)
}

const printChar = (currentLetterIndex, wordArray)=>{
    // si ya se alcanzó-procesó el número de letras de la palabra vuelve
    if(wordArray.length === currentLetterIndex) return;
    // almacena la palabra almacena en input-original sin el primer caracter
    inputOriginal.value = inputOriginal.value.substring(1);
    const spanChar = document.createElement('span');
    resultado.appendChild(spanChar);
    animatechar(spanChar)
        .then(()=>{
            const charSinCodificar = wordArray[currentLetterIndex];
            spanChar.innerHTML = alfabeto.includes(charSinCodificar) ?
            alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) % alfabeto.length]:
            charSinCodificar
            printChar(currentLetterIndex+1, wordArray);
        })
}

const animatechar = (spanChar)=>{
    let cambiosDeLetras = 0;
    return new Promise(resolve=>{
        const interval = setInterval(()=>{
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambiosDeLetras++;
            if(cambiosDeLetras === 3){
                clearInterval(interval);
                resolve();
            }
        },50);
    });
}

const submit = e =>{
    // prevenir el comportamiento base de evento submit que es enviar un formulario
    e.preventDefault();
    resultado.innerHTML = '';
    shifMessage();
}

cifrador.onsubmit = submit;
