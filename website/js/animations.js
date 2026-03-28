// Animations using GSAP

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    const tlHero = gsap.timeline();

    tlHero.from('.hero-title', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.2
    })
        .from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-actions .btn', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'back.out(1.7)',
            stagger: 0.2
        }, '-=0.5');

    // Shapes Animation (Floating)
    // Add logic for floating shapes here if added to HTML

    // About Section Stats Counter
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));

        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to(stat, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: 'power1.out'
                });
            }
        });
    });

    // Service Cards Stagger
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
});
