const contenedorCarrito = document.getElementById("carrito-contenido");
const botonVaciar = document.getElementById("vaciar-carrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function renderCarrito() {
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `
            <p>Tu carrito está vacío.</p>
        `;
        document.getElementById("total").textContent = 0;
        botonVaciar.disabled = true;
    } else {
        botonVaciar.disabled = false;
        let html = "";
        carrito.forEach(function(producto) {
            html += `
                <div class="row">
                    <div class="col s12">
                        <div class="card horizontal">
                            <div class="card-image">
                                <img src="${producto.imagen}" alt="${producto.nombre}">
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                    <h5>${producto.nombre}</h5>
                                    <p>
                                        Precio:
                                        $${producto.precio.toLocaleString("es-CL")}
                                    </p>
                                    <p>
                                        Cantidad: ${producto.cantidad}
                                    </p>
                                    <p>
                                        Stock disponible: ${producto.stock}
                                    </p>
                                    <p>
                                        Subtotal:
                                        $${(producto.precio * producto.cantidad).toLocaleString("es-CL")}
                                    </p>
                                </div>
                                <div class="card-action">
                                    <button class="btn-small red disminuir" data-codigo="${producto.codigo}">
                                        -
                                    </button>
                                    <button class="btn-small green aumentar" data-codigo="${producto.codigo}">
                                        +
                                    </button>
                                    <button
                                        class="btn-small red eliminar"
                                        data-codigo="${producto.codigo}"
                                    >
                                        <i class="material-icons left">delete</i>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        contenedorCarrito.innerHTML = html;
        asignarEventosEliminar();
        asignarEventosCantidad();
        calcularTotal();
    }
}

function asignarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll(".eliminar");
    botonesEliminar.forEach(function(boton) {
        boton.addEventListener("click", function() {
            const codigo = boton.dataset.codigo;
            carrito = carrito.filter(function(producto) {
                return producto.codigo !== codigo;
            });
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderCarrito();
            M.toast({
                html: "Producto eliminado del carrito"
            });
        });
    });
}

function calcularTotal() {
    let total = 0;
    carrito.forEach(function(producto) {
        total += producto.precio * producto.cantidad;
    });
    document.getElementById("total").textContent =
        total.toLocaleString("es-CL");
}

function asignarEventosCantidad() {
    const botonesAumentar = document.querySelectorAll(".aumentar");
    const botonesDisminuir = document.querySelectorAll(".disminuir");
    botonesAumentar.forEach(function(boton) {
        boton.addEventListener("click", function() {
            const codigo = boton.dataset.codigo;
            const producto = carrito.find(function(producto) {
                return producto.codigo === codigo;
            });
            if (producto.cantidad < producto.stock) {
                producto.cantidad++;
                localStorage.setItem(
                    "carrito",
                    JSON.stringify(carrito)
                );
                renderCarrito();
            } else {
                M.toast({
                    html: "No hay más stock disponible"
                });
            }
        });
    });

    botonesDisminuir.forEach(function(boton) {
        boton.addEventListener("click", function() {
            const codigo = boton.dataset.codigo;
            const producto = carrito.find(function(producto) {
                return producto.codigo === codigo;
            });
            if (producto.cantidad > 1) {
                producto.cantidad--;
                localStorage.setItem(
                    "carrito",
                    JSON.stringify(carrito)
                );
                renderCarrito();
            } else {
                M.toast({
                    html: "La cantidad mínima es 1"
                });
            }
        });
    });
}

botonVaciar.addEventListener("click", function() {
    if (carrito.length === 0) {
        M.toast({
            html: "El carrito ya está vacío"
        });
        return;
    }
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
    M.toast({
        html: "Carrito vaciado"
    });
});

renderCarrito();