const params = new URLSearchParams(window.location.search);
const codigoProducto = params.get("codigo");

const producto = productos.find(function(p) {
    return p.codigo === codigoProducto;
});

if (producto) {
    document.getElementById("detalle-imagen").src = producto.imagen;
    document.getElementById("detalle-imagen").alt = producto.nombre;
    document.getElementById("detalle-nombre").textContent = producto.nombre;
    document.getElementById("detalle-precio").textContent = "$" + producto.precio.toLocaleString("es-CL");
    document.getElementById("detalle-descripcion").textContent = producto.descripcion;
    document.getElementById("cantidad").max = producto.stock;
}

const inputCantidad = document.getElementById("cantidad");

inputCantidad.addEventListener("input", function() {
    const valor = parseInt(inputCantidad.value);
    if (valor > producto.stock) {
    inputCantidad.value = producto.stock;
    alert("Solo quedan " + producto.stock + " unidades disponibles.");
    }
    if (valor < 1 || isNaN(valor)) {
    inputCantidad.value = 1;
    }
});

const mensajeStock = document.getElementById("detalle-stock");

if (producto.stock <= 5) {
    mensajeStock.textContent = "¡Quedan solo " + producto.stock + " unidades! Stock crítico.";
    mensajeStock.style.color = "var(--color-rojo-sangre)";
} else {
    mensajeStock.textContent = "Stock disponible: " + producto.stock + " unidades";
}