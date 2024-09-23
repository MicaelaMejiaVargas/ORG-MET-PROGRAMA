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
            messageElement.textContent = '¡Has completado todas las imágenes!';
            timerElement.textContent = '';
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
        messageElement.textContent = `¡Has completado el test! Correctas: ${correctCount}, Incorrectas: ${incorrectCount}`;
        messageElement.style.color = 'blue';
    }


