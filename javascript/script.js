const form = document.getElementById('formularioInicio');
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/api/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            // alert('Formulario enviado con éxito');
            localStorage.setItem('nombreUsuario', data.nombre);
            form.reset();
            window.location.href = './pages/test_salud.html';
        } else {
            alert('Error en el registro.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar el formu :c');
    }
});
