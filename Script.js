// Array de productos (objetos)
const productos = [
    { id: 1, nombre: 'Escritorio', precio: 10000, imagen: './img/escritorio.jpg' },
    { id: 2, nombre: 'Laptop', precio: 350000, imagen: './img/laptop.jpg' },
    { id: 3, nombre: 'Monitor', precio: 150000, imagen: './img/monitor.jpg' },
    { id: 4, nombre: 'Mouse', precio: 10000, imagen: './img/mouse.jpg' },
    { id: 5, nombre: 'Silla', precio: 250000, imagen: './img/silla.jpg' },
    { id: 6, nombre: 'Teclado', precio: 250000, imagen: './img/teclado.jpg' },
];

let carrito = [];
let total = 0;

// Función para renderizar los productos en la página
function mostrarProductos() {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = ''; 

    productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');

        const img = document.createElement('img'); 
        img.src = producto.imagen; 
        img.alt = producto.nombre; 
        img.classList.add('imagen-producto');

        const h2 = document.createElement('h2');
        h2.textContent = producto.nombre;

        const pPrecio = document.createElement('p');
        pPrecio.textContent = `Precio: $${producto.precio}`;

        const boton = document.createElement('button');
        boton.textContent = 'Agregar al carrito';
        boton.addEventListener('click', () => agregarAlCarrito(producto));

        divProducto.appendChild(img); 
        divProducto.appendChild(h2);
        divProducto.appendChild(pPrecio);
        divProducto.appendChild(boton);
        contenedorProductos.appendChild(divProducto);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    total += producto.precio;
    actualizarIconoCarrito();
    mostrarCarrito();
}

// Actualiza el icono del carrito con la cantidad de productos
function actualizarIconoCarrito() {
    const cantidadProductos = document.getElementById('cantidadProductos');
    cantidadProductos.textContent = carrito.length;
}

// Función para mostrar el carrito en el DOM
function mostrarCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = '';

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        
        const imgCarrito = document.createElement('img');
        imgCarrito.src = item.imagen; 
        imgCarrito.alt = item.nombre; 
        imgCarrito.classList.add('imagen-producto');
        
        li.textContent = `${item.nombre} - $${item.precio} x ${item.cantidad}`;
        li.prepend(imgCarrito); 

        const botonSumar = document.createElement('button');
        botonSumar.textContent = '+';
        botonSumar.addEventListener('click', () => sumarProducto(index));

        const botonRestar = document.createElement('button');
        botonRestar.textContent = '-';
        botonRestar.addEventListener('click', () => restarProducto(index));

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarDelCarrito(index));

        li.appendChild(botonSumar);
        li.appendChild(botonRestar);
        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);
    });

    document.getElementById('totalCarrito').textContent = total;
}

// Función para sumar la cantidad de un producto en el carrito
function sumarProducto(index) {
    carrito[index].cantidad++;
    total += carrito[index].precio;
    mostrarCarrito();
}

// Función para restar la cantidad de un producto en el carrito
function restarProducto(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        total -= carrito[index].precio;
    } else {
        eliminarDelCarrito(index);
    }
    mostrarCarrito();
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    total -= carrito[index].precio * carrito[index].cantidad; 
    carrito.splice(index, 1); 
    actualizarIconoCarrito();
    mostrarCarrito();
}

// Función para confirmar la compra
function confirmarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
    } else {
        alert(`Compra confirmada. Total a pagar: $${total}`);
        carrito = [];
        total = 0;
        actualizarIconoCarrito();
        mostrarCarrito();
        cerrarModal(); 
    }
}

// Mostrar el modal
function mostrarModal() {
    const modal = document.getElementById('modalCarrito');
    modal.classList.remove('oculto');
    modal.style.display = 'block';
}

// Cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modalCarrito');
    modal.classList.add('oculto');
    modal.style.display = 'none'; 
}

// Asignar evento al botón de confirmar compra
document.getElementById('confirmarCompra').addEventListener('click', confirmarCompra);

// Asignar evento al icono del carrito
document.getElementById('iconoCarrito').addEventListener('click', mostrarModal);


// Inicializa la función para mostrar los productos
mostrarProductos();
