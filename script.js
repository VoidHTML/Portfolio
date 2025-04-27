document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const presentationSection = document.querySelector('#presentation');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    function updateNav() {
        const presentationRect = presentationSection.getBoundingClientRect();
        
        if (presentationRect.top <= 0) {
            nav.style.position = 'fixed';
            nav.style.top = '0';
        } else {
            nav.style.position = 'absolute';
            nav.style.top = '0';
        }

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const id = section.getAttribute('id');
            
            if (rect.top <= 150 && rect.bottom >= 150) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateNav);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const navHeight = nav.offsetHeight;

            window.scrollTo({
                top: targetSection.offsetTop - navHeight,
                behavior: 'smooth'
            });
        });
    });

    updateNav();

    // Gestion des barres de progression
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const value = bar.dataset.value;
        bar.style.setProperty('--value', value + '%');
    });
});


// Fonction pour charger la carte au survol
function loadMapOnHover(container) {
    if (!container.querySelector('iframe')) {
        container.innerHTML = `
            <iframe
                aria-label="carte google d'Ajaccio"   
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48059.71944500068!2d8.714637624730645!3d41.91893941843779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12da1b59add3ded1%3A0x40819a5fd97a940!2sAjaccio%2C%20France!5e0!3m2!1sfr!2sfr!4v1704811952085!5m2!1sfr!2sfr"
                width="100"
                height="100"
                style="border:0;"
                allowfullscreen=""  
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="map-frame">
            </iframe>
        `;
    }
}

// Si vous voulez l'utiliser, ajoutez un écouteur d'événement
document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('mouseover', () => loadMapOnHover(mapContainer));
    }
});