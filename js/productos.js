const productos = [
    // Armas de Fuego
    {
        codigo: "BOL-001",
        nombre: "Bolter",
        categoria: "Armas de Fuego",
        precio: 25000,
        stock: 15,
        imagen: "img/Bolter.webp",
        descripcion: "El Bolter es un arma de fuego de gran potencia utilizada por los Marines Espaciales en el universo de Warhammer 40,000. Es conocido por su capacidad para disparar proyectiles explosivos a gran velocidad, causando un daño devastador a sus objetivos."
    },

    {
        codigo: "BOL-002",
        nombre: "Bolter Pesado",
        categoria: "Armas de Fuego",
        precio: 35000,
        stock: 10,
        imagen: "img/Heavy_Bolter_Standard-Issue.webp",
        descripcion: "El Bolter Pesado es una versión más poderosa del Bolter estándar, diseñado para proporcionar un mayor poder de fuego en el campo de batalla. Es capaz de disparar proyectiles explosivos a una velocidad aún mayor, lo que lo convierte en un arma temible contra enemigos blindados y fortificaciones."
    },

    {
        codigo: "RP-001",
        nombre: "Rifle Pesado",
        categoria: "Armas de Fuego",
        precio: 250000,
        stock: 5,
        imagen: "img/HeavyRifle.webp",
        descripcion: "El Rifle Pesado es un arma de fuego de gran calibre utilizada por los Marines Espaciales en el universo de Warhammer 40,000. Es conocido por su capacidad para disparar proyectiles explosivos a gran velocidad, causando un daño devastador a sus objetivos."
    },

    // Armas cuerpo a cuerpo
    {
        codigo: "ESP-001",
        nombre: "Espada de Cadena",
        categoria: "Armas cuerpo a cuerpo",
        precio: 100000,
        stock: 8,
        imagen: "img/Chainsword.webp",
        descripcion: "La Espada de Cadena es un arma cuerpo a cuerpo utilizada por los Marines Espaciales en el universo de Warhammer 40,000. Está equipada con una hoja giratoria que corta a través de la armadura enemiga con facilidad, lo que la convierte en un arma letal en combate cercano."
    },

    {
        codigo: "HC-001",
        nombre: "Hacha de Cadena",
        categoria: "Armas cuerpo a cuerpo",
        precio: 150000,
        stock: 4,
        imagen: "img/Chainaxe.webp",
        descripcion: "La Hacha de Cadena es un arma cuerpo a cuerpo utilizada por los Marines Espaciales en el universo de Warhammer 40,000. Está equipada con una hoja giratoria que corta a través de la armadura enemiga con facilidad, lo que la convierte en un arma letal en combate cercano."
    },

    {
        codigo: "PE-001",
        nombre: "Puño de Energetico",
        categoria: "Armas cuerpo a cuerpo",
        precio: 200000,
        stock: 3,
        imagen: "img/power-fist.webp",
        descripcion: "El Puño de Energía es un arma cuerpo a cuerpo utilizada por los Marines Espaciales en el universo de Warhammer 40,000. Está diseñado para aumentar la fuerza del usuario y permitirle golpear con una potencia devastadora, capaz de atravesar la armadura enemiga con facilidad."
    },

    // Armas de Apoyo
    {
        codigo: "FL-001",
        nombre: "Flamer",
        categoria: "Armas de Apoyo",
        precio: 500000,
        stock: 6,
        imagen: "img/Flamer.webp",
        descripcion: "El Flamer es un arma de apoyo utilizada por los Marines Espaciales en el universo de Warhammer 40,000. Está diseñado para disparar un chorro de fuego que puede incinerar a los enemigos y causar un daño devastador en áreas amplias, lo que lo convierte en una herramienta efectiva para limpiar posiciones enemigas."
    },
    {
        codigo: "FP-001",
        nombre: "Fusil de Plasma",
        categoria: "Armas de Apoyo",
        precio: 200000,
        stock: 7,
        imagen: "img/Plasma_Incinerator.webp",
        descripcion: "El Fusil de Plasma es un arma de apoyo utilizada por los Marines Espaciales en el universo de Warhammer 40,000. Está diseñado para disparar proyectiles de plasma a alta temperatura, capaces de atravesar la armadura enemiga y causar un daño devastador. Es especialmente efectivo contra objetivos blindados y fortificaciones."
    },
    {
        codigo: "MEL-001",
        nombre: "Melta",
        categoria: "Armas de Apoyo",
        precio: 800000,
        stock: 4,
        imagen: "img/Melta_Rifle.webp",
        descripcion: "El Melta es un arma de apoyo utilizada por los Marines Espaciales en el universo de Warhammer 40,000. Está diseñado para disparar un rayo de energía concentrada que puede derretir la armadura enemiga y causar un daño devastador. Es especialmente efectivo contra objetivos blindados y fortificaciones."
    }
];

function renderProductos(listaProductos) {
    const contenedor = document.getElementById("lista-productos");
    let html = "";

    listaProductos.forEach(function(producto) {
    html += `
        <div class="col s12 m6 l4">
        <div class="card">
            <div class="card-image">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="card-content">
            <span class="card-title">${producto.nombre}</span>
            <p>$${producto.precio.toLocaleString("es-CL")}</p>
            </div>
            <div class="card-action">
            <a href="detalle-producto.html?codigo=${producto.codigo}">Ver detalle</a>
            </div>
        </div>
        </div>
    `;
    });

    contenedor.innerHTML = html;
}

renderProductos(productos);

document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});

const selectCategoria = document.getElementById("filtro-categoria");

if (selectCategoria) {
    selectCategoria.addEventListener("change", function() {
    const categoria = selectCategoria.value;

    if (categoria === "todas") {
        renderProductos(productos);
    } else {
        const filtrados = productos.filter(function(p) {
        return p.categoria === categoria;
        });
        renderProductos(filtrados);
    }
    });
}