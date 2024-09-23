document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formularioInicio');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        clearErrors();

        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const dni = document.getElementById('dni').value.trim();

        let hasError = false;

        //validaciones
        if (nombre.length < 2 || nombre.length > 12) {
            document.getElementById('error-nombre').textContent = "El nombre debe tener entre 2 y 12 caracteres.";
            hasError = true;
        }

        if (apellido.length < 2 || apellido.length > 30) {
            document.getElementById('error-apellido').textContent = "El apellido debe tener entre 2 y 30 caracteres.";
            hasError = true;
        }

        if (!/^\d{8}$/.test(dni)) {
            document.getElementById('error-dni').textContent = "El DNI debe tener 8 dígitos.";
            hasError = true;
        }

        if (!hasError) {
            localStorage.setItem('nombreUsuario', nombre);
            localStorage.setItem('apellido', apellido);
            localStorage.setItem('dni', dni);

            alert('Formulario enviado con éxito');
            form.reset();
            window.location.href = './pages/test_salud.html';
        }
    });

    function clearErrors() {
        document.getElementById('error-nombre').textContent = '';
        document.getElementById('error-apellido').textContent = '';
        document.getElementById('error-dni').textContent = '';
    }
});
