document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scroll para enlaces de navegación (sin cambios)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Verifica si el enlace no es para abrir un modal
            if (!this.id.startsWith('open-')) { 
                e.preventDefault();

                // Desplazamiento suave
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });

                // Cerrar el menú después de hacer clic en cualquier resolución
                const mainNav = document.getElementById('main-nav');
                const menuToggle = document.querySelector('.menu-toggle');
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // 2. Menú de hamburguesa (Toggle) para TODAS las pantallas (sin cambios)
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Opcional: Cerrar el menú si se hace clic fuera de él (sin cambios)
    document.addEventListener('click', (event) => {
        const isClickInsideNav = mainNav.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInsideNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // 3. Funcionalidad de Acordeón para FAQ principal (sin cambios)
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            faqItem.classList.toggle('open');
            question.querySelector('i').classList.toggle('active'); // Rotar flecha
        });
    });

    // --- NUEVO: Funcionalidad para Modales (Pop-ups) ---

    // Obtener los elementos de los botones que abren los modales
    const openTermsBtn = document.getElementById('open-terms-modal');
    const openPrivacyBtn = document.getElementById('open-privacy-modal');
    const openFaqModalBtn = document.getElementById('open-faq-modal-footer'); // Botón FAQ del footer

    // Obtener los elementos de los modales
    const termsModal = document.getElementById('termsModal');
    const privacyModal = document.getElementById('privacyModal');
    const faqModal = document.getElementById('faqModal');

    // Obtener los botones de cerrar (la 'x')
    const closeButtons = document.querySelectorAll('.close-button');

    // Función para abrir un modal
    function openModal(modalElement) {
        modalElement.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita el scroll del body
    }

    // Función para cerrar un modal
    function closeModal(modalElement) {
        modalElement.classList.remove('active');
        document.body.style.overflow = ''; // Habilita el scroll del body
    }

    // Event Listeners para abrir los modales
    if (openTermsBtn) {
        openTermsBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el enlace salte
            openModal(termsModal);
        });
    }
    if (openPrivacyBtn) {
        openPrivacyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(privacyModal);
        });
    }
    if (openFaqModalBtn) {
        openFaqModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(faqModal);
        });
    }

    // Event Listeners para cerrar los modales con la 'x'
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalToClose = document.getElementById(button.dataset.modal);
            closeModal(modalToClose);
        });
    });

    // Event Listener para cerrar el modal al hacer clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        if (event.target === termsModal) {
            closeModal(termsModal);
        }
        if (event.target === privacyModal) {
            closeModal(privacyModal);
        }
        if (event.target === faqModal) {
            closeModal(faqModal);
        }
    });

    // Event Listener para cerrar el modal con la tecla ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (termsModal.classList.contains('active')) closeModal(termsModal);
            if (privacyModal.classList.contains('active')) closeModal(privacyModal);
            if (faqModal.classList.contains('active')) closeModal(faqModal);
        }
    });

    // 4. Funcionalidad de Acordeón para FAQ dentro del modal
    const faqModalQuestions = document.querySelectorAll('.faq-question-modal');

    faqModalQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item-modal');
            faqItem.classList.toggle('open');
            question.querySelector('i').classList.toggle('active'); // Rotar flecha
        });
    });

});