// Fase 1: Frases
const phrases = [
    "arteriosclerosis",
    "parangutirimicuaro",
    "electrocardiograma",
    "electroencefalografista",
    "caleidoscopio"
];

let currentPhraseIndex = 0;
let fontSize = 8;
let timer;
const countdownTime = 3; // Tiempo en segundos para el temporizador
const phraseElement = document.getElementById('phrase');
const inputElement = document.getElementById('input');
const submitButton = document.getElementById('submit');
const messageElement = document.getElementById('message');
const timerElement = document.getElementById('timer');

// Contadores de respuestas correctas e incorrectas
let correctCount = 0;
let incorrectCount = 0;
const correctAnswersElement = document.getElementById('correctAnswers');
const incorrectAnswersElement = document.getElementById('incorrectAnswers');

// Temporizador global
let globalStartTime;
const globalTimerElement = document.getElementById('globalTimer');
let globalTimerInterval;

function startGlobalTimer() {
    globalStartTime = Date.now();

    globalTimerInterval = setInterval(() => {
        const elapsedTime = Date.now() - globalStartTime;
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
        const hours = Math.floor((elapsedTime / 1000 / 60 / 60));

        globalTimerElement.textContent = `Tiempo transcurrido: ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

function stopGlobalTimer() {
    clearInterval(globalTimerInterval);
}

function displayPhrase() {
    if (currentPhraseIndex < phrases.length) {
        phraseElement.textContent = phrases[currentPhraseIndex];
        phraseElement.style.fontSize = `${fontSize}px`;
        inputElement.value = '';
        messageElement.textContent = '';
        timerElement.textContent = '';
    } else {
        startColorPhase();
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
            fontSize += 3; // Aumenta el tamaño de la fuente
            displayPhrase();
        }
    }, 1000); // Actualiza cada segundo
}

submitButton.addEventListener('click', () => {
    const userInput = inputElement.value;
    const correctPhrase = phrases[currentPhraseIndex];

    if (userInput === correctPhrase) {
        messageElement.textContent = '¡Correcto!';
        messageElement.style.color = 'green';
        correctCount++;
    } else {
        messageElement.textContent = `Te equivocaste! La frase correcta era: "${correctPhrase}"`;
        messageElement.style.color = 'red';
        incorrectCount++;
    }

    updateScore();
    startCountdown();
});

displayPhrase();

// Fase 2: Colores
const colors = [
    { colorName: 'rojo', hex: '#FF0000' },
    { colorName: 'verde', hex: '#00FF00' },
    { colorName: 'azul', hex: '#0000FF' },
    { colorName: 'amarillo', hex: '#FFFF00' },
    { colorName: 'naranja', hex: '#FFA500' }
];

let currentColorIndex = 0;
const colorBox = document.getElementById('colorBox');
const colorContainer = document.getElementById('colorContainer');
const optionElements = [
    document.getElementById('option1'),
    document.getElementById('option2'),
    document.getElementById('option3')
];

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startColorPhase() {
    // Ocultar elementos de la fase de frases y mostrar los de colores
    phraseElement.style.display = 'none';
    inputElement.style.display = 'none';
    submitButton.style.display = 'none';
    colorContainer.style.display = 'block';
    document.getElementById('scoreContainer').style.display = 'block';

    displayColor();
}

function displayColor() {
    if (currentColorIndex < colors.length) {
        const currentColor = colors[currentColorIndex];

        // Muestra el color actual en la caja
        colorBox.style.backgroundColor = currentColor.hex;

        // Genera opciones, mezclando la correcta con otras dos opciones aleatorias
        const shuffledColors = shuffleArray([...colors]);
        const options = [currentColor, shuffledColors[0], shuffledColors[1]];
        shuffleArray(options);

        // Habilitar opciones de nuevo
        optionElements.forEach((element) => {
            element.classList.remove('disabled-option');
            element.style.pointerEvents = 'auto'; // Rehabilita clics
        });

        // Asigna opciones a los botones
        optionElements.forEach((element, index) => {
            element.textContent = options[index].colorName;
            element.onclick = () => checkAnswer(options[index].colorName);
        });

        messageElement.textContent = '';
        timerElement.textContent = '';
    } else {
        // Final del juego
        colorBox.style.display = 'none';
        document.getElementById('options').style.display = 'none';
        showFinalScore();
    }
}

function checkAnswer(selectedColor) {
    const correctColor = colors[currentColorIndex].colorName;

    // Deshabilitar opciones después de seleccionar una
    optionElements.forEach((element) => {
        element.classList.add('disabled-option');
        element.style.pointerEvents = 'none'; // Desactiva clics
    });

    if (selectedColor === correctColor) {
        messageElement.textContent = '¡Correcto!';
        messageElement.style.color = 'green';
        correctCount++;
    } else {
        messageElement.textContent = `Te equivocaste! El color correcto era: "${correctColor}"`;
        messageElement.style.color = 'red';
        incorrectCount++;
    }

    updateScore();

    // Esperar unos segundos antes de cambiar al siguiente color
    setTimeout(() => {
        currentColorIndex++;
        displayColor();
    }, 3000); // Espera 3 segundos antes de cambiar
}

function updateScore() {
    correctAnswersElement.textContent = correctCount;
    incorrectAnswersElement.textContent = incorrectCount;
}

function showFinalScore() {
    // Detener el temporizador global
    stopGlobalTimer();

    // Ocultar todos los elementos
    colorContainer.style.display = 'none';
    colorBox.style.display = 'none';
    document.getElementById('scoreContainer').style.display = 'none';
    messageElement.style.display = 'none';
    timerElement.style.display = 'none';
    globalTimerElement.style.display = 'none';

    // Mostrar el resultado final
    const finalTime = Date.now() - globalStartTime;
    const seconds = Math.floor((finalTime / 1000) % 60);
    const minutes = Math.floor((finalTime / 1000 / 60) % 60);
    const hours = Math.floor((finalTime / 1000 / 60 / 60));

    const resultElement = document.createElement('div');
    resultElement.innerHTML = `
        <h2>¡Has completado el test!</h2>
        <p>Respuestas correctas: ${correctCount}</p>
        <p>Respuestas incorrectas: ${incorrectCount}</p>
        <p>Tiempo total: ${hours}h ${minutes}m ${seconds}s</p>
        <button id="redirectButton">Ir a la siguiente página</button>
    `;
    document.body.appendChild(resultElement);

    // Redirigir al hacer clic en el botón
    const redirectButton = document.getElementById('redirectButton');
    redirectButton.addEventListener('click', () => {
        window.location.href = './pages/eleccionRubro.html'; 
    });
}

// Iniciar el temporizador global al cargar la página
window.onload = () => {
    startGlobalTimer();
    displayPhrase();
};
