document.getElementById('phraseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const correctPhrase = 'yo solo se que no se nada frase escrita por un sabio filosofo';
    const correctPhraseUno = 'YO SOLO SE QUE NO SE NADA FRASE ESCRITA POR UN SABIO FILOSOFO';
    const correctPhraseDos = 'Yo solo se que no se nada frase escrita por un sabio filosofo';

    const inputPhrase = document.getElementById('inputPhrase').value.trim();
    const feedback = document.getElementById('feedback');
    const inputField = document.getElementById('inputPhrase');

    if (inputPhrase === correctPhrase || inputPhrase === correctPhraseUno || inputPhrase === correctPhraseDos) {
        feedback.textContent = '¡Correcto! Lo escribiste bien';
        feedback.className = 'form-text feedback correct';
        inputField.disabled = true;
    } else {
        feedback.textContent = 'No esta bien escrito. ¡Pero no te preocupes! Continua con la siguiente prueba';
        feedback.className = 'form-text feedback incorrect';
        inputField.disabled = true;
    }

    feedback.style.display = 'block';
});

document.addEventListener('DOMContentLoaded', function() {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
        document.getElementById('nombreUsuario').textContent = nombreUsuario;
    }
});