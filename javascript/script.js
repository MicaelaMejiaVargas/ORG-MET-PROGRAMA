document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formularioInicio');
    const nav = document.getElementById('primerNav');

    const btnClaro = document.getElementById('claro');
    const btnOscuro = document.getElementById('oscuro');
    const btnColor = document.getElementById('color');

    btnClaro.addEventListener('click', () => {
        document.body.classList.remove('oscuro-theme', 'color-theme');
        document.body.classList.add('claro-theme');

        nav.classList.remove('oscuro-theme-nav', 'color-theme-nav');
        nav.classList.add('claro-theme-nav');

        form.classList.remove('oscuro-theme-form', 'color-theme-form');
        form.classList.add('claro-theme-form');

        increaseFontBtn.classList.remove('btn-outline-light');
        increaseFontBtn.classList.add('btn-outline-dark');
        decreaseFontBtn.classList.remove('btn-outline-light');
        decreaseFontBtn.classList.add('btn-outline-dark');
    });

    btnOscuro.addEventListener('click', () => {
        document.body.classList.remove('claro-theme', 'color-theme');
        document.body.classList.add('oscuro-theme');

        nav.classList.remove('claro-theme-nav', 'color-theme-nav');
        nav.classList.add('oscuro-theme-nav');

        form.classList.remove('claro-theme-form', 'color-theme-form');
        form.classList.add('oscuro-theme-form');

        increaseFontBtn.classList.remove('btn-outline-dark');
        increaseFontBtn.classList.add('btn-outline-light');
        decreaseFontBtn.classList.remove('btn-outline-dark');
        decreaseFontBtn.classList.add('btn-outline-light');
    });

    btnColor.addEventListener('click', () => {
        document.body.classList.remove('claro-theme', 'oscuro-theme');
        document.body.classList.add('color-theme');

        nav.classList.remove('claro-theme-nav', 'oscuro-theme-nav');
        nav.classList.add('color-theme-nav');

        form.classList.remove('claro-theme-form', 'oscuro-theme-form');
        form.classList.add('color-theme-form');

        increaseFontBtn.classList.remove('btn-outline-dark');
        increaseFontBtn.classList.add('btn-outline-light');
        decreaseFontBtn.classList.remove('btn-outline-dark');
        decreaseFontBtn.classList.add('btn-outline-light');
    });

    // Control de tamaño de letra
    const increaseFontBtn = document.getElementById('increaseFont');
    const decreaseFontBtn = document.getElementById('decreaseFont');

    let currentFontSize = 16; // Tamaño base

    increaseFontBtn.addEventListener('click', () => {
        currentFontSize += 1;
        document.body.style.fontSize = `${currentFontSize}px`;
    });

    decreaseFontBtn.addEventListener('click', () => {
        if (currentFontSize > 12) { // Limitar tamaño mínimo de fuente
            currentFontSize -= 1;
            document.body.style.fontSize = `${currentFontSize}px`;
        }
    });
    
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
