
/**
 * MikLouds - JavaScript Principal
 * Funcionalidad del sitio
 */

document.addEventListener('DOMContentLoaded', function() {
    inicializarAnimaciones();
    inicializarNavegacion();
    inicializarScroll();
    inicializarMenuMovil();
});

/**
 * Animaciones de entrada
 */
function inicializarAnimaciones() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos a animariniciar
    const elementosAnimar = document.querySelectorAll('.product-card, .feature-item, .timeline-mini-item');
    
    elementosAnimar.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Activar animaciones
    setTimeout(() => {
        document.querySelectorAll('.animate-visible').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
}

/**
 * Navegación
 */
function inicializarNavegacion() {
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll effects
 */
function inicializarScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(74, 103, 65, 0.15)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Validación de formularios
 */
function validarFormulario(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const campos = form.querySelectorAll('[required]');
        let valido = true;

        campos.forEach(campo => {
            if (!campo.value.trim()) {
                valido = false;
                campo.style.borderColor = '#e74c3c';
            } else {
                campo.style.borderColor = '#E8E4DE';
            }
        });

        if (valido) {
            alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
            form.reset();
        } else {
            alert('Por favor, completa todos los campos requeridos.');
        }
    });
}

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

// Exportar funciones
window.MikLouds = {
    validarFormulario: validarFormulario
};

