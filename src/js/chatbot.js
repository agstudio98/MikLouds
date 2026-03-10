/**
 * MikLouds - Chatbot JavaScript
 * Asistente virtual para atención al cliente
 */

// Base de conocimientos del chatbot
const baseConocimientos = {
    // Saludos
    'hola': '¡Hola! 👋 Bienvenido/a a MikLouds. Soy el asistente virtual de tu tienda de alimentos naturales. ¿En qué puedo ayudarte hoy?',
    'buenos días': '¡Buenos días! 🌞 ¿En qué puedo ayudarte hoy?',
    'buenas tardes': '¡Buenas tardes! 🌤️ ¿En qué puedo ayudarte hoy?',
    'buenas noches': '¡Buenas noches! 🌙 ¿En qué puedo ayudarte hoy?',
    'hello': '¡Hello! 👋 Welcome to MikLouds. How can I help you today?',
    
    // Productos
    'producto': 'Tenemos una gran variedad de productos naturales: Chia, maíz, galletas sin TACC, legumbres, granolas y más. ¡Visita nuestra sección de catálogo para ver todos nuestros productos!',
    'chia': '¡Las semillas de chia son uno de nuestros productos estrella! Son ricas en omega-3, fibra y antioxidantes. Tenemos presentación de 250g y 500g. ¿Te gustaría hacer un pedido?',
    'maíz': 'Contamos con maíz integral y diferentes variedades de maíz para vos. Es 100% natural, sin aditivos. ¿Querés más información?',
    'galletas sin tacc': 'Nuestras galletas sin TACC son artesanales y deliciosas. Tenemos variantes: chocolate, vainilla y avena. Son aptas para celiacos. ¿Te interesa alguna variedad?',
    'legumbres': 'Tenemos un amplio catálogo de legumbres: lentejas, garbanzos, porotos negros, porotos rojos, arvejas. Todos de primera calidad. ¿Cuál te gustaría pedir?',
    'granola': 'Nuestra granola casera es preparada artesanalmente con frutos secos, miel natural y avena integral. ¡El acompañamiento perfecto para tu desayuno! 🥣',
    'sin tacc': 'Tenemos muchos productos sin TACC: galletas, panes, harinas y más. Todos certificados y seguros para personas con celiaquía. ¿Qué producto te interesa?',
    'gluten free': 'Yes! We have a variety of gluten-free products. All our TACC-free items are clearly labeled. Would you like me to show you our catalog?',
    
    // Información de la tienda
    'ubicación': '📍 Nos encontramos en Av. Fructuosa Rivera 379. ¡Te esperamos de lunes a sábado de 9:00 a 20:00 horas!',
    'dirección': '📍 Nuestra sucursal está en Av. Fructuosa Rivera 379. ¡Visítanos!',
    'donde están': '📍 Estamos en Av. Fructuosa Rivera 379. ¡Te esperamos!',
    'horario': '🕘 Nuestro horario de atención es:\n• Lunes a viernes: 9:00 a 20:00\n• Sábados: 9:00 a 14:00\n• Domingos: Cerrado',
    'horarios': '🕘 Nuestro horario de atención es:\n• Lunes a viernes: 9:00 a 20:00\n• Sábados: 9:00 a 14:00\n• Domingos: Cerrado',
    'quiénes son': '👩‍🍳 MikLouds fue fundado por Alicia Montesco y Valeria Lopez, con el objetivo de ofrecer alimentos naturales y saludables a la comunidad. ¡Desde 2026 bringiéndoos lo mejor de la naturaleza!',
    'fundadoras': '👩‍⚕️ Nuestras fundadoras son Alicia Montesco y Valeria Lopez. Juntas crearon MikLouds con la visión de promover una alimentación saludable y natural. ¡Son las mejores! ⭐',
    'empresa': 'MikLouds es tu tienda de alimentos naturales ubicada en Av. Fructuosa Rivera 379. Ofrecemos productos dietéticos, saludables, sin TACC, maíz, granolas y legumbres. ¡Desde 2026 cuidando de tu salud!',
    
    // Cómo funciona el sitio
    'cómo funciona': '😊 Es muy fácil:\n\n1. Explora nuestro catálogo de productos\n2. Selecciona los que te interesen\n3. Completa el formulario con tu nombre y mensaje\n4. ¡Te redirigimos a WhatsApp para confirmar tu pedido!\n\n¿Necesitas ayuda con algo más?',
    'como comprar': '🛒 Para comprar es muy sencillo:\n1. Ve a la sección "Catálogo"\n2. Busca los productos que quieras\n3. Haz clic en "Hacer Pedido"\n4. Completa tus datos\n5. Te contactamos por WhatsApp\n\n¡Así de fácil!',
    'cómo pedido': '📝 El proceso es simple:\n1. Elegís tus productos del catálogo\n2. Click en "Hacer Pedido"\n3. Completás tu nombre y mensaje\n4. Se abre WhatsApp con tu pedido\n5. Coordinamos el entrega\n\n¿Querés ver el catálogo?',
    'catálogo': '📦 podés ver todos nuestros productos en la sección Catálogo. Allí podés filtrar por categoría y hacer tu pedido directamente. ¿Te gustaría ir ahora?',
    'catalog': '📦 You can view all our products in the Catalog section. There you can filter by category and place your order directly. Would you like to go now?',
    
    // Pedidos
    'pedido': '📦 Para hacer un pedido:\n1. Visitá nuestro catálogo\n2. Seleccioná los productos\n3. Completá el formulario\n4. Te contactamos por WhatsApp\n\n¿Querés hacer un pedido ahora?',
    'comprar': '🛒 ¡Perfecto! Podés comprar directamente desde nuestro catálogo. Allí encontrarás todos nuestros productos disponibles. ¿Te ayudo a buscar algo específico?',
    'precio': '💰 Contamos con precios accesibles y productos de la mejor calidad. ¡Visitá nuestro catálogo para ver todos los precios!',
    'precios': '💰 Nuestros precios son muy competitivos para productos de alta calidad natural. ¡En el catálogo podés ver cada producto con su precio!',
    'delivery': '🚚 Contamos con servicio de entrega a domicilio. ¡Coordiná tu pedido por WhatsApp y lo terminamos dechar!',
    'envío': '🚚 Ofrecemos envío a domicilio. ¡Coordiná con nosotros por WhatsApp para安排 la entrega!',
    'envios': '🚚 Ofrecemos envío a domicilio. ¡Coordiná con nosotros por WhatsApp para安排 la entrega!',
    
    // Reclamos
    'reclamo': '😟 Lamentamos que tengas un problema. Para reclamos, te atiende nuestra atención al cliente directamente por WhatsApp. ¿Querés que te passe el contacto?',
    'reclamar': '😟 Entendemos tu frustración. Para hacer un reclamo formal, contáctanos directamente por WhatsApp y te asistimos de inmediato.',
    'problema': '😟 Si tenés algún problema con tu pedido, por favor contactanos por WhatsApp para resolverlo lo antes posible. Tu satisfacción es importante para nosotros.',
    'queja': '😟 Lamentamos tu experiencia. Te pedimos disculpas. Por favor, contactanos por WhatsApp para que podamos ayudarte a resolver el problema.',
    
    // Cancelaciones
    'cancelar': '❌ Si necesitás cancelar un pedido, por favor contactanos lo antes posible por WhatsApp. Si el pedido aún no fue preparado, no hay problema. ¿Te paso el contacto?',
    'cancelación': '❌ Podés cancelar tu pedido contactándonos por WhatsApp antes de que sea preparado. ¿Te ayudo a contactarnos?',
    'cancelar pedido': '❌ Para cancelar un pedido, por favor comunicate con nosotros por WhatsApp a la brevedad. Haremos todo lo posible por ayudarte. ¿Te paso el número?',
    
    // Demoras
    'demora': '⏰ Lamentamos la demora. Los pedidos pueden tardar dependiendo de la demanda. ¿Me decís tu nombre para verificar el estado?',
    'demorado': '⏰ Tu pedido podría estar demorado por alta demanda. Por favor, contactanos por WhatsApp para verificar el estado exactode tu pedido.',
    'tarda': '⏰ El tiempo de entrega depende de la distancia y demanda. ¿Querés que verifique tu pedido? Contactanos por WhatsApp.',
    'retraso': '⏰ Pedimos disculpas por el retraso. Por favor, verificá el estado de tu pedido contactándonos directamente.',
    
    // Contacto
    'contacto': '📱 Podés contactarnos por WhatsApp para cualquier consulta o pedido. ¡Estamos para ayudarte!',
    'whatsapp': '📱 Escribinos por WhatsApp para hacer tu pedido o consultar cualquier duda. ¡Respondemos rápido!',
    'teléfono': '📞 Podés llamarnos o escribirnos por WhatsApp. ¿Te paso el número directo?',
    'mail': '📧 También podés escribirnos por email. ¿Te interesa algo en particular?',
    
    // Alternativas
    'gracias': '🙏 ¡De nada! Si tenés más preguntas, no dudes en preguntar. ¡Estamos para ayudarte! 😊',
    'gracias!': '🙏 ¡De nada! Fue un placer ayudarte. ¡Que tengas un día increíble! 🌿',
    'thank you': '🙏 You\'re welcome! Feel free to ask if you need anything else. Have a great day! 🌿',
    'adiós': '👋 ¡Chau! ¡Que te vayas muy bien! Gracias por visitarnos. 🌿',
    'bye': '👋 Bye! Thanks for visiting us. Have a wonderful day! 🌿',
    'hasta luego': '👋 ¡Hasta luego! ¡Te esperamos pronto! 🌿',
    
    //默认值
    'default': '🤔 No estoy seguro de entender tu consulta. Pero puedo ayudarte con:\n\n• Información sobre nuestros productos\n• Cómo hacer un pedido\n• Estado de tu pedido\n• Reclamos o cancelaciones\n• Horarios y ubicación\n\n¿Podés reformular tu pregunta? 😊'
};

// Mensajes de error específicos
const mensajesError = {
    'error': '😅 Parece que hubo un error. ¿Podrías intentar de nuevo?',
    'problema técnico': '😅 Estamos teniendo problemas técnicos. Por favor, intentá de nuevo en unos minutos.',
    'no funciona': '😟 Si el sitio no está funcionando correctamente, por favor contactanos por WhatsApp para ayudarte.'
};

document.addEventListener('DOMContentLoaded', function() {
    inicializarChatbot();
});

/**
 * Inicializar el chatbot
 */
function inicializarChatbot() {
    const input = document.getElementById('mensaje-input');
    const btnEnviar = document.getElementById('btn-enviar');
    const quickReplies = document.querySelectorAll('.quick-reply');

    // Mensaje de bienvenida
    setTimeout(() => {
        agregarMensaje('bot', baseConocimientos['hola']);
    }, 500);

    // Event listener para enviar mensaje
    if (btnEnviar) {
        btnEnviar.addEventListener('click', enviarMensaje);
    }

    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                enviarMensaje();
            }
        });
    }

    // Quick replies
    quickReplies.forEach(btn => {
        btn.addEventListener('click', () => {
            const texto = btn.textContent;
            agregarMensaje('usuario', texto);
            procesarRespuesta(texto);
        });
    });
}

/**
 * Enviar mensaje del usuario
 */
function enviarMensaje() {
    const input = document.getElementById('mensaje-input');
    if (!input) return;

    const mensaje = input.value.trim();
    
    if (!mensaje) return;

    // Agregar mensaje del usuario
    agregarMensaje('usuario', mensaje);
    
    // Limpiar input
    input.value = '';
    
    // Procesar respuesta
    procesarRespuesta(mensaje);
}

/**
 * Procesar la respuesta del chatbot
 */
function procesarRespuesta(mensaje) {
    // Mostrar indicador de escritura
    mostrarIndicadorEscritura();
    
    // Simular delay de respuesta
    setTimeout(() => {
        ocultarIndicadorEscritura();
        
        // Buscar respuesta en base de conocimientos
        const respuesta = buscarRespuesta(mensaje.toLowerCase());
        agregarMensaje('bot', respuesta);
        
        // Scroll al último mensaje
        const messagesContainer = document.querySelector('.chatbot-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, 1000 + Math.random() * 1000);
}

/**
 * Buscar respuesta en base de conocimientos
 */
function buscarRespuesta(mensaje) {
    // Buscar coincidencias
    for (const [clave, respuesta] of Object.entries(baseConocimientos)) {
        if (mensaje.includes(clave)) {
            return respuesta;
        }
    }
    
    // Verificar mensajes de error
    for (const [clave, respuesta] of Object.entries(mensajesError)) {
        if (mensaje.includes(clave)) {
            return respuesta;
        }
    }
    
    return baseConocimientos['default'];
}

/**
 * Agregar mensaje al chat
 */
function agregarMensaje(tipo, contenido) {
    const messagesContainer = document.querySelector('.chatbot-messages');
    if (!messagesContainer) return;

    const ahora = new Date();
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minuto = ahora.getMinutes().toString().padStart(2, '0');
    const tiempo = `${hora}:${minuto}`;

    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `mensaje ${tipo}`;
    
    // Detectar si hay múltiples líneas
    const tieneMultiplesLineas = contenido.includes('\n');
    const contenidoFormateado = tieneMultiplesLineas 
        ? contenido.replace(/\n/g, '<br>') 
        : contenido;

    mensajeDiv.innerHTML = `
        <div class="mensaje-content">
            <p>${contenidoFormateado}</p>
            <span class="mensaje-time">${tiempo}</span>
        </div>
    `;

    messagesContainer.appendChild(mensajeDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Mostrar indicador de escritura
 */
function mostrarIndicadorEscritura() {
    const messagesContainer = document.querySelector('.chatbot-messages');
    if (!messagesContainer) return;

    // Verificar si ya existe el indicador
    if (document.querySelector('.indicador-escritura')) return;

    const indicador = document.createElement('div');
    indicador.className = 'mensaje bot indicador-escritura';
    indicador.innerHTML = `
        <div class="mensaje-content">
            <div class="escribiendo">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    messagesContainer.appendChild(indicador);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Ocultar indicador de escritura
 */
function ocultarIndicadorEscritura() {
    const indicador = document.querySelector('.indicador-escritura');
    if (indicador) {
        indicador.remove();
    }
}

// Funciones globales
window.enviarMensaje = enviarMensaje;
window.procesarRespuesta = procesarRespuesta;
window.agregarMensaje = agregarMensaje;

