//============== SCRIPTS ESPECIFICOS DE presupuestos.html ===============

// Primero definimos las funciones de validación
function validarNombre(campo) {
    // Verifica que el campo solo contenga letras y tenga entre 2 y 30 caracteres
    const regex = /^[a-zA-ZÀ-ÿ\s]{2,15}$/;
    return regex.test(campo);
}

function validarApellido(campo) {
    // Verifica que el campo solo contenga letras y tenga entre 2 y 30 caracteres
    const regex = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
    return regex.test(campo);
}

function validarTelefono(telefono) {
    // Verifica que el número de teléfono solo contenga dígitos y tenga entre 9 y 15 caracteres
    const regex = /^[0-9]{9}$/;
    return regex.test(telefono);
}

function validarCorreo(correo) {
    // Verifica que el correo sea válido utilizando una expresión regular
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(correo);
}

// Luego, utilizamos las funciones dentro del manejo del evento submit
document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Prevenir el envío del formulario hasta que se validen los campos
    event.preventDefault();

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const primerApellido = document.getElementById('primerApellido').value.trim();
    const segundoApellido = document.getElementById('segundoApellido').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();

    // Verificaciones usando las funciones previamente definidas
    if (!validarNombre(nombre)) {
        alert('Por favor, ingresa un nombre válido (debe tener solo letras y maximo 15 caracteres).');
        return;
    }

    if (!validarApellido(primerApellido)) {
        alert('Por favor, ingresa un primer apellido válido (debe tener solo letras y maximo 40 caracteres).');
        return;
    }

    if (segundoApellido && !validarApellido(segundoApellido)) {
        alert('Por favor, ingresa un segundo apellido válido (debe tener solo letras y maximo 40 caracteres).');
        return;
    }

    if (!validarTelefono(telefono)) {
        alert('Por favor, ingresa un número de teléfono válido (debe tener 9 digitos ).');
        return;
    }

    if (!validarCorreo(correo)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    // Si todo está correcto, se puede enviar el formulario
    alert('Formulario enviado con éxito!');
    this.submit();
});

// ===================== SELECT ====================

document.querySelector('.opciones').addEventListener('change', function () {
    // Ocultar todas las opciones derivadas
    document.querySelectorAll('.derived-options').forEach(function (el) {
        el.style.display = 'none';
    });

    // Mostrar las opciones correspondientes según la selección
    var selectedValue = this.value;
    if (selectedValue === 'hombre') {
        document.getElementById('hombre-options').style.display = 'block';
    } else if (selectedValue === 'mujer') {
        document.getElementById('mujer-options').style.display = 'block';
    } else if (selectedValue === 'nino') {
        document.getElementById('nino-options').style.display = 'block';
    }
});

// Escucha el evento de clic del botón de reset
document.getElementById('buttReset').addEventListener('click', function () {
    // Recargar la página
    location.reload();
});


// ===================== CALCULAR PRECIO ======================

document.getElementById('calcular_precio').addEventListener('click', function () {
    let precioTotal = 0;

    // Obtener el valor del select principal (hombre, mujer, niño)
    const selectValue = document.querySelector('.opciones').value;

    // Obtener el valor de la sub-opción seleccionada dependiendo de la opción principal
    let subOpcionValue = '';
    if (selectValue === 'hombre') {
        subOpcionValue = document.querySelector('select[name="hombreOpciones"]').value;
    } else if (selectValue === 'mujer') {
        subOpcionValue = document.querySelector('select[name="mujerOpciones"]').value;
    } else if (selectValue === 'nino') {
        subOpcionValue = document.querySelector('select[name="ninoOpciones"]').value;
    }

    // Extraer el precio de la sub-opción seleccionada
    if (subOpcionValue) {
        // Asumiendo que el valor de la opción es algo como "NIKE AIR MAX 90€"
        let precio = parseFloat(subOpcionValue.match(/\d+/)[0]);
        precioTotal += precio;
    }

    // Obtener el valor de los radio buttons y sumar su precio
    const radios = document.querySelectorAll('input[name="opcion"]:checked');
    radios.forEach(function (radio) {
        if (radio.value === 'opcion1') {
            precioTotal += 10; // Precio para "3 días hábiles"
        } else if (radio.value === 'opcion2') {
            precioTotal += 5; // Precio para "10 días hábiles"
        } else if (radio.value === 'opcion3') {
            precioTotal += 2; // Precio para "20 días hábiles"
        }
    });

    // Obtener los valores de los checkboxes y sumar sus precios
    const checkboxes = document.querySelectorAll('input[name="extra"]:checked');
    checkboxes.forEach(function (checkbox) {
        if (checkbox.nextElementSibling.textContent.includes('Color personalizado')) {
            precioTotal += 5; // Precio para "Color personalizado"
        } else if (checkbox.nextElementSibling.textContent.includes('Envuelto para regalo')) {
            precioTotal += 3; // Precio para "Envuelto para regalo"
        } else if (checkbox.nextElementSibling.textContent.includes('Edicion especial')) {
            precioTotal += 10; // Precio para "Caja de madera"
        } else if (checkbox.nextElementSibling.textContent.includes('Edicion Gold')) {
            precioTotal += 7; // Precio para "Edición especial"
        }
    });

    // Mostrar el precio total en el input de texto
    document.getElementById('precio_estimado').value = precioTotal + " €";
});

// ABRIR MODAL POLITICA DE PRIVACIDAD DESDE EL HIPERVINCULO DEL CHECKBOX

// Reutilizar el código para abrir el modal desde el enlace en el texto de términos
document.getElementById('enlace_acepta_terminos').addEventListener('click', function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    document.getElementById('openModal_politica').click(); // Simula un clic en el botón del footer
});

