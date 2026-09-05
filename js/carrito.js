const botonEliminar = document.getElementById("eliminar-bolter");

botonEliminar.addEventListener("click", function () {
    const producto = document.getElementById("producto-bolter");

    producto.remove();

    document.getElementById("subtotal").textContent = 0;
    document.getElementById("total").textContent = 0;
});

const botonVaciar = document.getElementById("vaciar-carrito");

botonVaciar.addEventListener("click", function () {
    const producto = document.getElementById("producto-bolter");

    if (producto) {
        producto.remove();
    }

    document.getElementById("subtotal").textContent = 0;
    document.getElementById("total").textContent = 0;
});