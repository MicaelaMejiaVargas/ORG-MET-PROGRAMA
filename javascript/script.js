document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formularioInicio');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const dni = document.getElementById('dni').value;

        localStorage.setItem('nombreUsuario', nombre);
        localStorage.setItem('apellido', apellido);
        localStorage.setItem('dni', dni);

        alert('Formulario enviado con éxito');
        form.reset();
        window.location.href = './pages/test_salud.html';
    });
});
