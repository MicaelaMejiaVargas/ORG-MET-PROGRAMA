function CambioTexto() {
    const valorSeleccionado = document.getElementById("valor").value;
    const elementos = document.querySelectorAll(".preguntas, .opciones");

    if (valorSeleccionado) {
        elementos.forEach((elemento) => {
            elemento.style.fontSize = `${valorSeleccionado}px`;
            elemento.style.fontFamily = "Arial";
            elemento.style.color = "#2c3e50";  
        });
    }
}


const respuestasCorrectas = [1, 2, 0, 3, 0]; 


function mostrarSiguientePregunta(preguntaActual) {
    const siguientePregunta = document.getElementById('pregunta' + (preguntaActual + 1));
    if (siguientePregunta) {
        siguientePregunta.classList.remove('oculto');
        siguientePregunta.classList.add('fade', 'show');
    }
}

function responder(preguntaNumero) {
    mostrarSiguientePregunta(preguntaNumero);
}


document.getElementById('evaluarBtn').addEventListener('click', function () {
    const todasPreguntas = document.querySelectorAll('.container-pregunta');
    let todasContestadas = true;
    let respuestasUsuario = [];

    
    todasPreguntas.forEach((pregunta, index) => {
        const radios = pregunta.querySelectorAll('input[type="radio"]');
        const contestada = Array.from(radios).some(radio => radio.checked);

        
        if (contestada) {
            const respuestaSeleccionada = Array.from(radios).findIndex(radio => radio.checked);
            respuestasUsuario.push(respuestaSeleccionada);
        } else {
            todasContestadas = false;
            alert(`Por favor, responde la pregunta ${index + 1}`);
        }
    });


    if (todasContestadas) {
        let respuestasCorrectasTotal = 0;

        respuestasUsuario.forEach((respuesta, index) => {
            if (respuesta === respuestasCorrectas[index]) {
                respuestasCorrectasTotal++;
            }
        });

        
        alert(`Respondiste correctamente ${respuestasCorrectasTotal} de ${respuestasCorrectas.length} preguntas.`);

        if (respuestasCorrectasTotal === respuestasCorrectas.length) {
            window.location.href = "atencionalcliente2.html";  
        }
    }
});
