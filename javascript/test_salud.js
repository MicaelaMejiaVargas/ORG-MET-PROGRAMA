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
        const inputPhraseElement = document.getElementById('inputPhrase'); // El elemento que mostrará la palabra escrita

        function displayPhrase() {
            if (currentPhraseIndex < phrases.length) {
                phraseElement.textContent = phrases[currentPhraseIndex];
                phraseElement.style.fontSize = `${fontSize}px`;
                inputElement.value = '';
                messageElement.textContent = '';
                timerElement.textContent = '';
                inputPhraseElement.textContent = ''; // Reinicia el texto mostrado del input
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

        inputElement.addEventListener('input', () => {
            // Cada vez que el usuario escribe algo, se actualiza la palabra escrita arriba del input
            inputPhraseElement.textContent = inputElement.value;
        });

        submitButton.addEventListener('click', () => {
            const userInput = inputElement.value;
            const correctPhrase = phrases[currentPhraseIndex];

            if (userInput === correctPhrase) {
                messageElement.textContent = '¡Correcto!';
                messageElement.style.color = 'green';
            } else {
                messageElement.textContent = `Te equivocaste! La frase correcta era: "${correctPhrase}"`;
                messageElement.style.color = 'red';
            }

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
            inputPhraseElement.style.display = 'none'; // Oculta la frase escrita por el usuario
            colorContainer.style.display = 'block';

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
                window.location.href = './pages/generadorCertificado.html';
            }
        }

        function checkAnswer(selectedColor) {
            const correctColor = colors[currentColorIndex].colorName;

            if (selectedColor === correctColor) {
                messageElement.textContent = '¡Correcto!';
                messageElement.style.color = 'green';
            } else {
                messageElement.textContent = `Te equivocaste! El color correcto era: "${correctColor}"`;
                messageElement.style.color = 'red';
            }

            startColorCountdown();
        }

        function startColorCountdown() {
            let timeLeft = countdownTime;
            timerElement.textContent = `Siguiente color en ${timeLeft} segundos...`;

            timer = setInterval(() => {
                timeLeft--;
                timerElement.textContent = `Siguiente color en ${timeLeft} segundos...`;

                if (timeLeft <= 0) {
                    clearInterval(timer);
                    currentColorIndex++;
                    displayColor();
                }
            }, 1000); // Actualiza cada segundo
    }