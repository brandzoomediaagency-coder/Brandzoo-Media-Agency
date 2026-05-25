// Animations using GSAP

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    const tlHero = gsap.timeline();

    tlHero.from('.hero-badge', {
        duration: 1,
        y: 60,
        opacity: 0,
        ease: 'power3.out'
    })
    .from('.hero-title', {
        duration: 1,
        y: 80,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-subtitle', {
        duration: 1,
        y: 40,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.btn-growth', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'back.out(1.7)'
    }, '-=0.4')
    .from('.floating-tag', {
        duration: 1,
        scale: 0,
        opacity: 0,
        stagger: 0.3,
        ease: 'back.out(2)'
    }, '-=0.5');

    // Hero Background Entry
    gsap.from('.hero-bg', {
        duration: 2,
        x: 100,
        opacity: 0,
        ease: 'power2.out'
    });

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
