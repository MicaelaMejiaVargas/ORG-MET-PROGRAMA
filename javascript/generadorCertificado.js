document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formularioInicio');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('input', () => {
        const isValid = form.checkValidity();
        submitButton.disabled = !isValid;
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('dni').value;
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;
        const direccion = document.getElementById('direccion').value;
        const genero = document.querySelector('input[name="genero"]:checked').value;
        const passw = document.getElementById('passw').value;
        const r_passw = document.getElementById('r_passw').value;

        if (passw !== r_passw) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const rescatistaData = {
            dni,
            nombre,
            apellido,
            telefono,
            email,
            direccion,
            genero,
            passw,
            r_passw
        };

        try {
            const response = await fetch('http://localhost:3000/rescatistas/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rescatistaData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert('Registro exitoso: ' + data.message);
                form.reset();
                window.location.href = '../pages/login.html';
            } else {
                alert('Error: ' + data.message || 'Error en el registro.');
            }
        } catch (error) {
            console.error('Error al registrar el rescatista:', error);
            document.querySelector('.error').style.display = 'block';
        }
    });
});

