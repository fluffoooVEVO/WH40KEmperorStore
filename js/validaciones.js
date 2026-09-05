//Manejo de usuarios en localStorage

function obtenerUsuarios() {
    const datos = localStorage.getItem("usuarios");
    return datos ? JSON.parse(datos) : [];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function obtenerUsuarioActual() {
    const datos = localStorage.getItem("usuarioActual");
    return datos ? JSON.parse(datos) : null;
}

//Registro

function registrarUsuario(nombre, email, password) {
    const usuarios = obtenerUsuarios();

    const yaExiste = usuarios.some(function (u) {
        return u.email.toLowerCase() === email.toLowerCase();
    });

    if (yaExiste) {
        return { ok: false, mensaje: "Ese correo ya está registrado." };
    }

    usuarios.push({ nombre: nombre, email: email, password: password });
    guardarUsuarios(usuarios);

    return { ok: true, mensaje: "Cuenta creada con éxito." };
}

//Login

function iniciarSesion(email, password) {
    const usuarios = obtenerUsuarios();

    const usuario = usuarios.find(function (u) {
        return u.email.toLowerCase() === email.toLowerCase() && u.password === password;
    });

    if (!usuario) {
        return { ok: false, mensaje: "Correo o contraseña incorrectos." };
    }

    localStorage.setItem("usuarioActual", JSON.stringify({ nombre: usuario.nombre, email: usuario.email }));
    return { ok: true, mensaje: "Bienvenido, " + usuario.nombre };
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActual");
    window.location.href = "index.html";
}

//Actualiza el navbar según si hay sesión iniciada

function actualizarNav() {
    const zonaSesion = document.getElementById("zona-sesion");
    if (!zonaSesion) return;

    const usuario = obtenerUsuarioActual();

    if (usuario) {
        zonaSesion.innerHTML =
            '<a href="#!" id="btn-logout">Hola, ' + usuario.nombre.split(" ")[0] +
            ' <i class="material-icons right">logout</i></a>';

        document.getElementById("btn-logout").addEventListener("click", cerrarSesion);
    } else {
        zonaSesion.innerHTML =
            '<a href="login.html"><i class="material-icons">account_circle</i></a>';
    }
}

//Conexión con los formularios

document.addEventListener("DOMContentLoaded", function () {
    actualizarNav();

    const formLogin = document.getElementById("form-login");
    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value;
            const mensaje = document.getElementById("mensaje-login");

            const resultado = iniciarSesion(email, password);

            if (resultado.ok) {
                mensaje.className = "mensaje-exito";
                mensaje.textContent = resultado.mensaje;
                setTimeout(function () {
                    window.location.href = "index.html";
                }, 800);
            } else {
                mensaje.className = "mensaje-error";
                mensaje.textContent = resultado.mensaje;
            }
        });
    }

    const formRegistro = document.getElementById("form-registro");
    if (formRegistro) {
        formRegistro.addEventListener("submit", function (e) {
            e.preventDefault();

            const nombre = document.getElementById("registro-nombre").value.trim();
            const email = document.getElementById("registro-email").value.trim();
            const password = document.getElementById("registro-password").value;
            const password2 = document.getElementById("registro-password2").value;
            const mensaje = document.getElementById("mensaje-registro");

            if (password !== password2) {
                mensaje.className = "mensaje-error";
                mensaje.textContent = "Las contraseñas no coinciden.";
                return;
            }

            if (password.length < 6) {
                mensaje.className = "mensaje-error";
                mensaje.textContent = "La contraseña debe tener al menos 6 caracteres.";
                return;
            }

            const resultado = registrarUsuario(nombre, email, password);

            if (resultado.ok) {
                mensaje.className = "mensaje-exito";
                mensaje.textContent = resultado.mensaje + " Redirigiendo a iniciar sesión...";
                setTimeout(function () {
                    window.location.href = "login.html";
                }, 1000);
            } else {
                mensaje.className = "mensaje-error";
                mensaje.textContent = resultado.mensaje;
            }
        });
    }
});