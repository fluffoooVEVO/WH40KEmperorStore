// js/detalle.js

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
}