/**
 * MikLouds - Catálogo JavaScript
 * Funcionalidad de filtrado y pedidos via WhatsApp
 */

// Datos de productos
const productos = [
    {
        id: 1,
        nombre: 'Chia Premium',
        categoria: 'Semillas',
        precio: '$850',
        imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
        descripcion: 'Semillas de chía orgánicas, ricas en omega-3 y fibra.'
    },
    {
        id: 2,
        nombre: 'Maíz Integral',
        categoria: 'Granos',
        precio: '$450',
        imagen: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400',
        descripcion: 'Maíz integral natural, sin aditivos ni conservantes.'
    },
    {
        id: 3,
        nombre: 'Galletas Sin TACC',
        categoria: 'Sin TACC',
        precio: '$620',
        imagen: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
        descripcion: 'Deliciosas galletas artesanales sin gluten ni TACC.'
    },
    {
        id: 4,
        nombre: 'Legumbres Mix',
        categoria: 'Legumbres',
        precio: '$580',
        imagen: 'https://images.unsplash.com/photo-1515543904323-de27c9f54f0e?w=400',
        descripcion: 'Mix de legumbres seleccionadas: lentejas, garbanzos y porotos.'
    },
    {
        id: 5,
        nombre: 'Granola Casera',
        categoria: 'Granolas',
        precio: '$780',
        imagen: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400',
        descripcion: 'Granola artesanal con frutos secos y miel natural.'
    },
    {
        id: 6,
        nombre: 'Mix de Semillas',
        categoria: 'Semillas',
        precio: '$720',
        imagen: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400',
        descripcion: 'Combinación de semillas de girasol, calabaza y linaza.'
    },
    {
        id: 7,
        nombre: 'Galletas de Arroz',
        categoria: 'Sin TACC',
        precio: '$480',
        imagen: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=400',
        descripcion: 'Crujientes galletas de arroz integral.'
    },
    {
        id: 8,
        nombre: 'Porotos Negros',
        categoria: 'Legumbres',
        precio: '$520',
        imagen: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400',
        descripcion: 'Porotos negros orgánicos cultivados localement.'
    },
    {
        id: 9,
        nombre: 'Avena Instantánea',
        categoria: 'Granos',
        precio: '$390',
        imagen: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
        descripcion: 'Avena integral instantánea, perfecta para el desayuno.'
    },
    {
        id: 10,
        nombre: 'Polen de Abeja',
        categoria: 'Suplementos',
        precio: '$1.200',
        imagen: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400',
        descripcion: 'Polen de abeja puro, rico en proteínas y vitaminas.'
    },
    {
        id: 11,
        nombre: 'Galletas de Avena',
        categoria: 'Sin TACC',
        precio: '$550',
        imagen: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
        descripcion: 'Galletas artesanales con avena y pasas de uva.'
    },
    {
        id: 12,
        nombre: 'Quinoa Real',
        categoria: 'Granos',
        precio: '$890',
        imagen: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
        descripcion: 'Quinoa real orgánica de alta montaña.'
    }
];

// Variable global para el producto seleccionado
let productoSeleccionado = null;

document.addEventListener('DOMContentLoaded', function() {
    inicializarCatalogo();
    inicializarFiltros();
    inicializarModal();
    inicializarMenuMovil();
});

/**
 * Inicializar catálogo de productos
 */
function inicializarCatalogo() {
    const grid = document.getElementById('productos-grid');
    if (!grid) return;

    renderizarProductos(productos);
}

/**
 * Renderizar productos en el grid
 */
function renderizarProductos(listaProductos) {
    const grid = document.getElementById('productos-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (listaProductos.length === 0) {
        grid.innerHTML = `
            <div class="sin-resultados" style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <p style="font-size: 1.2rem; color: var(--marron);">No se encontraron productos con esos criterios.</p>
                <button onclick="limpiarFiltros()" class="btn-ver-mas" style="margin: 20px auto 0;">Limpiar filtros</button>
            </div>
        `;
        return;
    }

    listaProductos.forEach((producto, index) => {
        const card = document.createElement('div');
        card.className = 'producto-catalogo';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
            <div class="producto-catalogo-info">
                <span class="categoria">${producto.categoria}</span>
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <span class="precio">${producto.precio}</span>
                <button class="btn-pedir" onclick="abrirModal(${producto.id})">Hacer Pedido</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

/**
 * Inicializar filtros de búsqueda
 */
function inicializarFiltros() {
    const inputBusqueda = document.getElementById('busqueda');
    const selectCategoria = document.getElementById('categoria');

    if (inputBusqueda) {
        inputBusqueda.addEventListener('input', filtrarProductos);
    }

    if (selectCategoria) {
        selectCategoria.addEventListener('change', filtrarProductos);
    }
}

/**
 * Filtrar productos según criterios
 */
function filtrarProductos() {
    const inputBusqueda = document.getElementById('busqueda');
    const selectCategoria = document.getElementById('categoria');

    const termino = inputBusqueda ? inputBusqueda.value.toLowerCase() : '';
    const categoria = selectCategoria ? selectCategoria.value : 'todos';

    const productosFiltrados = productos.filter(producto => {
        const coincideBusqueda = producto.nombre.toLowerCase().includes(termino) ||
                                  producto.descripcion.toLowerCase().includes(termino);
        
        const coincideCategoria = categoria === 'todos' || 
                                  producto.categoria.toLowerCase() === categoria.toLowerCase();

        return coincideBusqueda && coincideCategoria;
    });

    renderizarProductos(productosFiltrados);
}

/**
 * Limpiar filtros
 */
function limpiarFiltros() {
    const inputBusqueda = document.getElementById('busqueda');
    const selectCategoria = document.getElementById('categoria');

    if (inputBusqueda) inputBusqueda.value = '';
    if (selectCategoria) selectCategoria.value = 'todos';

    renderizarProductos(productos);
}

// Función global para limpiar filtros
window.limpiarFiltros = limpiarFiltros;

/**
 * Inicializar modal de pedido
 */
function inicializarModal() {
    const modal = document.getElementById('modal-pedido');
    const closeBtn = modal?.querySelector('.modal-close');
    const form = document.getElementById('form-pedido');

    if (closeBtn) {
        closeBtn.addEventListener('click', cerrarModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                cerrarModal();
            }
        });
    }

    if (form) {
        form.addEventListener('submit', enviarPedido);
    }
}

/**
 * Abrir modal de pedido
 */
function abrirModal(productoId) {
    productoSeleccionado = productos.find(p => p.id === productoId);
    
    if (!productoSeleccionado) return;

    const modal = document.getElementById('modal-pedido');
    const titulo = document.getElementById('modal-producto-nombre');

    if (titulo && productoSeleccionado) {
        titulo.textContent = productoSeleccionado.nombre;
    }

    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Función global para abrir modal
window.abrirModal = abrirModal;

/**
 * Cerrar modal de pedido
 */
function cerrarModal() {
    const modal = document.getElementById('modal-pedido');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Limpiar formulario
        const form = document.getElementById('form-pedido');
        if (form) form.reset();
    }
}

// Función global para cerrar modal
window.cerrarModal = cerrarModal;

/**
 * Enviar pedido por WhatsApp
 */
function enviarPedido(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre-cliente')?.value.trim();
    const mensaje = document.getElementById('mensaje-cliente')?.value.trim();
    
    // Obtener productos seleccionados
    const checkboxes = document.querySelectorAll('.checkbox-item input:checked');
    const productosSeleccionados = Array.from(checkboxes).map(cb => cb.value);

    if (!nombre) {
        alert('Por favor, ingresa tu nombre.');
        return;
    }

    if (productosSeleccionados.length === 0 && !productoSeleccionado) {
        alert('Por favor, selecciona al menos un producto.');
        return;
    }

    // Construir mensaje para WhatsApp
    let mensajeWhatsApp = `*Hola MikLouds!*\n\n`;
    mensajeWhatsApp += `*Nombre:* ${nombre}\n`;
    
    if (productoSeleccionado) {
        mensajeWhatsApp += `*Producto:* ${productoSeleccionado.nombre} (${productoSeleccionado.precio})\n`;
    }
    
    if (productosSeleccionados.length > 0) {
        mensajeWhatsApp += `*Pedido:*\n`;
        productosSeleccionados.forEach(prod => {
            mensajeWhatsApp += `• ${prod}\n`;
        });
    }
    
    if (mensaje) {
        mensajeWhatsApp += `\n*Mensaje:* ${mensaje}`;
    }

    // Codificar mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);
    
    // Número de WhatsApp de la empresa (placeholder - reemplazar con número real)
    const numeroWhatsApp = '5491133333333';
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, '_blank');
    
    // Cerrar modal
    setTimeout(cerrarModal, 500);
}

// Función global para enviar pedido
window.enviarPedido = enviarPedido;

/**
 * Inicializar menú móvil (hamburguesa y drawer)
 */
function inicializarMenuMovil() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (!navToggle || !mainNav) return;

    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
        navToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = mainNav.querySelectorAll('.nav-link, .header-cta-mobile');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Cerrar menú al hacer clic fuera del menú
    document.addEventListener('click', (e) => {
        if (mainNav.classList.contains('active') && 
            !mainNav.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

