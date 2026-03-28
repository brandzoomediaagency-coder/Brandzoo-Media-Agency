// Brandzoo Media - Homepage JS v2.0

document.addEventListener('DOMContentLoaded', () => {

    // ── Mobile Menu ──
    const toggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.main-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            toggle.classList.toggle('active');
        });
    }

    // ── Sticky Header ──
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 80);
    });

    // ── Animated Counters ──
    const counters = document.querySelectorAll('.count-num');
    const observeCounters = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                let current = 0;
                const step = target / 60;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current);
                    }
                }, 25);
                observeCounters.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observeCounters.observe(c));

    // ── FAQ Accordion ──
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const q = item.querySelector('.faq-q');
        if (q) {
            q.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                faqItems.forEach(i => i.classList.remove('open'));
                if (!isOpen) item.classList.add('open');
            });
        }
    });

    // ── Particle Background ──
    const canvas = document.createElement('canvas');
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;';
        particleContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resize = () => {
            canvas.width = particleContainer.offsetWidth;
            canvas.height = particleContainer.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.4 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(32,178,170,${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) particles.push(new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        };
        animate();
    }

    // ── Scroll Reveal ──
    const reveals = document.querySelectorAll('.service-card-new, .metric-card, .faq-item, .about-grid, .ai-grid, .contact-grid');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ── Form Submit ──
    const form = document.querySelector('.lead-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-form-submit');
            btn.innerHTML = '<i class="fas fa-check"></i> Sent! We\'ll contact you within 24hrs';
            btn.style.background = '#10b981';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Get My Free Audit Now';
                btn.style.background = '';
                form.reset();
            }, 4000);
        });
    }

});
