const phrases = [
    "las hamburguesas son mas ricas con cheddar",
    "lleva la inteligencia en la sangre pero falta que circule",
    "los ñoquis se comen todos los 29 de cada mes",
    "las mascotas son espectaculadores"
];

let currentPhraseIndex = 0;
let fontSize = 10;
let timer;
const countdownTime = 10; // Tiempo en segundos para el temporizador

const phraseElement = document.getElementById('phrase');
const inputElement = document.getElementById('input');
const submitButton = document.getElementById('submit');
const messageElement = document.getElementById('message');
const timerElement = document.createElement('p');
timerElement.id = 'timer';
document.getElementById('container').appendChild(timerElement);

function displayPhrase() {
    if (currentPhraseIndex < phrases.length) {
        phraseElement.textContent = phrases[currentPhraseIndex];
        phraseElement.style.fontSize = `${fontSize}px`;
        inputElement.value = '';
        messageElement.textContent = '';
        timerElement.textContent = '';
    } else {
        phraseElement.textContent = '¡Has completado todas las frases!';
        phraseElement.style.fontSize = '20px';
        inputElement.style.display = 'none';
        submitButton.style.display = 'none';
        timerElement.textContent = '';
    }
}

function startCountdown() {
    let timeLeft = countdownTime;
    timerElement.textContent = `Siguiente frase en ${timeLeft} segundos...`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Siguiente frase en ${timeLeft} segundos...`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            currentPhraseIndex++;
            fontSize += 5; // Aumenta el tamaño de la fuente
            displayPhrase();
        }
    }, 1000); // Actualiza cada segundo
}

submitButton.addEventListener('click', () => {
    const userInput = inputElement.value;
    const correctPhrase = phrases[currentPhraseIndex];
    submitButton

    if (userInput === correctPhrase) {
        messageElement.textContent = '¡Correcto!';
        messageElement.style.color = 'green';
    } else {
        messageElement.textContent = `Te equivocaste! pero no te preocupes. La frase correcta era: "${correctPhrase}"`;
        messageElement.style.color = 'red';
    }

    // Inicia el temporizador para cambiar a la siguiente frase
    startCountdown();

});

displayPhrase();
