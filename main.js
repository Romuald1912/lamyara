document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const revealElements = document.querySelectorAll('.reveal');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    });

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    const parallaxSection = document.querySelector('.parallax');
    if (parallaxSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            parallaxSection.style.backgroundPositionY = scrolled * parallaxSpeed + 'px';
        });
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }

    window.addEventListener('scroll', function() {
        if (!hasAnimated && statNumbers.length > 0) {
            const firstStat = statNumbers[0];
            const statTop = firstStat.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (statTop < windowHeight - 100) {
                hasAnimated = true;
                animateStats();
            }
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
