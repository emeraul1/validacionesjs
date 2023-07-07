export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio."
    },
    email: {
        valueMissing: "Este campo email no puede estar vacio.",
        typeMismatch: "El correo no es valido."
    },
    password: {
        valueMissing: "Este campo contraseña no puede estar vacio.",
        patternMismatch: "Al menos 6 caracteres máximo 12 debe tener una minúscula, una mayúscula, un número y no puede tener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio.",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero : {
        valueMissing: "Este campo no puede estar vacio.",
        patternMismatch: "El formato requerido es xxxxxxxxxx"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio.",
        patternMismatch: "La direccion debe tener entre 10 a 40 cracteres."
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio.",
        patternMismatch: "La ciudad debe tener entre 3 a 30 cracteres."
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio.",
        patternMismatch: "El estado debe tener entre 3 a 30 cracteres."
    },

}

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ""
    tipoDeErrores.forEach(error => {
        if (input.validity[error]){
            
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    const mensaje = "Debes tener al menos 18 años de edad";
    const esMayorDeEdad = mayorEdad(fechaCliente);

    if (esMayorDeEdad) {
        input.setCustomValidity("");
    } else {
        input.setCustomValidity(mensaje);
    }
}

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );

    return diferenciaFechas <= fechaActual;
}
