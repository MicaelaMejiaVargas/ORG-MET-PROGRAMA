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
        timerElement.textContent = `Siguiente frase en: ${countdownTime} segundos...`;
        submitButton.disabled = false; // Habilitar el botón al mostrar nueva frase
    } else {
        startColorPhase();
        phraseElement.textContent = '¡Has completado todas las frases!';
        phraseElement.style.fontSize = '20px';
        inputElement.style.display = 'none';
        submitButton.style.display = 'none';
        timerElement.textContent = '';

        window.location.href = './eleccionRubro.html';
    }
}

function startCountdown() {
    let timeLeft = countdownTime;

    timer = setInterval(() => {
        timerElement.textContent = `Siguiente frase en: ${timeLeft} segundos...`;
        timeLeft--;

        if (timeLeft < 0) {
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
    submitButton.disabled = true; // Deshabilitar el botón después de enviar
    startCountdown();
});

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
    document.getElementById('phraseContainer').style.display = 'none';
    document.getElementById('colorContainer').style.display = 'block';
    document.getElementById('scoreContainer').style.display = 'block';
    timerElement.style.display = 'none'; // Ocultar temporizador de fase

    displayColor();
}

function displayColor() {
    if (currentColorIndex < colors.length) {
        const currentColor = colors[currentColorIndex];

        // Muestra el color actual en la caja
        colorBox.style.backgroundColor = currentColor.hex;

        // Selecciona dos colores incorrectos, asegurándose de que no se repita el color correcto
        const incorrectColors = colors.filter(color => color.colorName !== currentColor.colorName);
        const shuffledIncorrectColors = shuffleArray(incorrectColors).slice(0, 2);

        // Genera las opciones mezclando el color correcto con los dos incorrectos
        const options = shuffleArray([currentColor, ...shuffledIncorrectColors]);

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
        element.style.pointerEvents = 'none'; // Deshabilitar clics
    });

    if (selectedColor === correctColor) {
        messageElement.textContent = '¡Correcto!';
        messageElement.style.color = 'green';
        correctCount++;
    } else {
        messageElement.textContent = `Incorrecto! El color correcto era: "${correctColor}"`;
        messageElement.style.color = 'red';
        incorrectCount++;
    }

    updateScore();
    currentColorIndex++;
    displayColor();
}

function updateScore() {
    correctAnswersElement.textContent = correctCount;
    incorrectAnswersElement.textContent = incorrectCount;
}
function showFinalScore() {
    stopGlobalTimer(); // Detener el temporizador global

    // Ocultar todos los elementos de la fase de colores
    colorBox.style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('colorContainer').style.display = 'none';
    document.getElementById('scoreContainer').style.display = 'none';
    messageElement.style.display = 'none';
    timerElement.style.display = 'none';
    globalTimerElement.style.display = 'none';

    // Mostrar el contenedor de resultados finales
    document.getElementById('finalScoreContainer').style.display = 'block';
    document.getElementById('finalCorrectAnswers').textContent = correctCount;
    document.getElementById('finalIncorrectAnswers').textContent = incorrectCount;

    const finalTime = Date.now() - globalStartTime;
    const seconds = Math.floor((finalTime / 1000) % 60);
    const minutes = Math.floor((finalTime / 1000 / 60) % 60);
    const hours = Math.floor((finalTime / 1000 / 60 / 60));
    document.getElementById('finalTime').textContent = `${hours}h ${minutes}m ${seconds}s`;
    
    // Agregar evento al botón de redirección
    const redirectButton = document.getElementById('redirectButton');
    redirectButton.addEventListener('click', () => {
        window.location.href = './eleccionRubro.html'; // Cambia esto por la URL deseada
    });
}

// Iniciar el juego
startGlobalTimer();
displayPhrase(); // Mostrar la primera frase
