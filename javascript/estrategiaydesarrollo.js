function CambioTexto() {
    const valorSeleccionado = document.getElementById("valor").value;
    const preguntas = document.querySelectorAll(".preguntas, .opciones");

    if (valorSeleccionado) {
        preguntas.forEach((elemento) => {
            elemento.style.fontSize = `${valorSeleccionado}px`;
            elemento.style.fontFamily = "Arial";
            elemento.style.color = "#2c3e50";
        });
    }
}
