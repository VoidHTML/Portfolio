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