class Examen {
    constructor(respuestasCorrectas) {
        this.respuestasCorrectas = respuestasCorrectas;
    }

    corregir(respuestasAlumno) {
        let puntaje = 0;
        let resultados = [];

        for (let i = 0; i < this.respuestasCorrectas.length; i++) {
            if (respuestasAlumno[i] === this.respuestasCorrectas[i]) {
                puntaje++;
                resultados.push(`Pregunta ${i + 1}: Correcta`);
            } else {
                resultados.push(`Pregunta ${i + 1}: Incorrecta (Correcta: ${this.respuestasCorrectas[i]})`);
            }
        }

        return {
            puntaje: puntaje,
            totalPreguntas: this.respuestasCorrectas.length,
            resultados: resultados
        };
    }
}

// Ejemplo de uso
const respuestasCorrectas = ['C', 'D', 'A', 'B', 'A', 'A', 'C', 'D', 'A', 'C' ]; // Respuestas correctas del examen
const examen = new Examen(respuestasCorrectas);

// Respuestas del alumno
const respuestasAlumno = ['A', 'B', 'B', 'D', 'C', 'D', 'C', 'A', 'D', 'D'];

const resultado = examen.corregir(respuestasAlumno);

// Mostrar resultados
document.write(`Puntaje: ${resultado.puntaje} de ${resultado.totalPreguntas}` + "<br>");
document.write("Resultados por pregunta:" + "<br>"); 
resultado.resultados.forEach(res => document.write(res + "<br>"));
