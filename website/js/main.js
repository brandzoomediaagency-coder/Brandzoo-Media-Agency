// Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle (Mobile)
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.nav-links'); // Assuming we wrap UL in nav-links

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            document.body.classList.toggle('mobile-menu-open');
            mobileToggle.querySelector('i').classList.toggle('fa-bars');
            mobileToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Stats Counter Animation
    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        setInterval(() => {
            slides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % totalSlides;
            slides[currentSlide].style.display = 'block';
            // Trigger reflow/animation if needed, or just rely on CSS animation on display block
            slides[currentSlide].classList.add('fade');
        }, 5000); // Change every 5 seconds
    }

    // Video Header Slider
    const videoSlides = document.querySelectorAll('.video-slide');
    if (videoSlides.length > 0) {
        let currentVideoSlide = 0;
        const totalVideoSlides = videoSlides.length;

        function nextVideoSlide() {
            // Remove active class from current slide
            videoSlides[currentVideoSlide].classList.remove('active');
            
            // Move to next slide
            currentVideoSlide = (currentVideoSlide + 1) % totalVideoSlides;
            
            // Add active class to next slide
            videoSlides[currentVideoSlide].classList.add('active');

            // Ensure the video in the active slide is playing
            const nextVideo = videoSlides[currentVideoSlide].querySelector('video');
            if (nextVideo) {
                nextVideo.currentTime = 0; // Reset to start
                nextVideo.play().catch(e => console.log("Video auto-play handled:", e));
            }
        }

        // Initialize first video play
        const firstVideo = videoSlides[0].querySelector('video');
        if (firstVideo) {
            firstVideo.play().catch(e => console.log("Initial video play blocked:", e));
        }

        setInterval(nextVideoSlide, 7000); // Change every 7 seconds
    }

    // Services Tab Switching Logic
    const servicesData = {
        'social-media': {
            title: 'Social Media Marketing',
            desc: "Social is in our name, yes, quite literally! We devise outstanding social media strategies that boost a brand's image across multiple channels. We keep an open, inviting dialogue in the content and run strategic ad campaigns that keep bringing mass clientele to the websites, guaranteeing maximum customer conversions every bit of second.",
            img: 'images/services/social-media.png',
            tech: ['Meta Ads', 'TikTok Pixel', 'LinkedIn Ads', 'Sprout Social']
        },
        'seo': {
            title: 'Search Engine Optimization',
            desc: "Be seen where it matters most. Our SEO experts climb the search rankings to ensure your brand is the king of the organic jungle. We optimize every pixel and word for maximum visibility, driving sustainable organic growth.",
            img: 'images/services/seo.png',
            tech: ['Ahrefs', 'SEMRush', 'Google Search Console', 'Screaming Frog']
        },
        'ppc': {
            title: 'PPC Service',
            desc: "Fast-track your reach with surgical precision. Our Paid Search campaigns are optimized for conversion, ensuring every cent of your budget works as hard as a hunting predator to bring you high-quality leads.",
            img: 'images/services/ppc.png',
            tech: ['Google Ads', 'Google Tag Manager', 'Microsoft Advertising']
        },
        'influencer': {
            title: 'Influencer Marketing',
            desc: "Leverage the power of the pack. We connect you with the right voices to amplify your brand message authentically across the digital landscape, building trust and engagement through influential partnerships.",
            img: 'images/services/influencer.png',
            tech: ['HypeAuditor', 'Upfluence', 'GRIN', 'Modash']
        },
        'playstore-reviews': {
            title: 'Playstore reviews',
            desc: "Boost your app's credibility with authentic Playstore reviews. We help you build a trustworthy profile that encourages more downloads and improves your app store ranking, ensuring your app stands out in a crowded marketplace.",
            img: 'images/services/playstore.png',
            tech: ['AppTweak', 'Sensor Tower', 'Mobile Action']
        },
        'web-dev': {
            title: 'Website Development',
            desc: "Your digital lair, built to last. We create high-performance, custom websites that are as functional as they are beautiful, ensuring a seamless experience across all devices.",
            img: 'images/services/web-dev.png',
            tech: ['React', 'Next.js', 'Tailwind CSS', 'Node.js']
        },
        'creative-design': {
            title: 'Creative Designing',
            desc: "Visuals that leave a lasting paw-print. From branding to UI, our designs capture the wild essence of your unique brand identity and communicate your message with creative flair.",
            img: 'images/services/creative-design.png',
            tech: ['Adobe Creative Cloud', 'Figma', 'Midjourney AI', 'Canva Pro']
        },
        'ugc-videos': {
            title: 'UGC Videos',
            desc: "Authentic content that converts. Our UGC (User Generated Content) video strategies leverage real users to tell your brand story, creating high-engagement social proof that resonates with your audience and builds genuine trust.",
            img: 'images/services/ugc.png',
            tech: ['CapCut', 'Adobe Premiere Pro', 'Frame.io', 'Trendalytic']
        },
        'ui-ux': {
            title: 'UI/UX Design',
            desc: "User experiences that feel like second nature. We design intuitive, seamless journeys that keep your customers coming back for more, focusing on accessibility and visual delight.",
            img: 'images/services/ui-ux.png',
            tech: ['Figma', 'Adobe XD', 'Principle', 'Maze']
        },
        'orm': {
            title: 'Online Reputation Management(ORM)',
            desc: "Protect your territory. We manage your online reputation to ensure your brand's bark is always as good as its bite, suppressing negatives and amplifying the positive stories.",
            img: 'images/services/orm.png',
            tech: ['Brandwatch', 'Meltwater', 'Reputon']
        },
        'digital-marketing': {
            title: 'Digital marketing',
            desc: "The complete digital roar. We craft comprehensive digital marketing strategies that unite all channels—social, search, and paid—into a single, high-performance hunting pack for your brand, driving measurable results and market dominance.",
            img: 'images/services/digital-marketing.png',
            tech: ['HubSpot', 'Salesforce', 'Google Analytics 4', 'Hotjar']
        },
        'wordpress': {
            title: 'WordPress Website Development',
            desc: "Flexible, powerful, and easy to manage. We build custom WordPress solutions tailored to your business's unique needs, from blogs to complex enterprise platforms.",
            img: 'images/services/wordpress.png',
            tech: ['WordPress', 'Elementor Pro', 'WooCommerce', 'WP Rocket']
        }
    };

    const servicePills = document.querySelectorAll('.service-pill');
    const serviceImg = document.getElementById('service-img');
    const serviceTitle = document.getElementById('service-title');
    const serviceDesc = document.getElementById('service-desc');
    const serviceTech = document.getElementById('service-tech');
    const serviceDisplay = document.getElementById('service-display');

    if (servicePills.length > 0) {
        servicePills.forEach(pill => {
            pill.addEventListener('click', () => {
                const serviceKey = pill.getAttribute('data-service');
                const data = servicesData[serviceKey];

                if (data) {
                    // Update active state for pills
                    servicePills.forEach(p => p.classList.remove('active'));
                    pill.classList.add('active');

                    // Smooth transition for content
                    serviceDisplay.style.opacity = '0';
                    serviceDisplay.style.transform = 'translateY(10px)';

                    setTimeout(() => {
                        serviceImg.src = data.img;
                        serviceImg.alt = data.title;
                        serviceTitle.textContent = data.title;
                        serviceDesc.textContent = data.desc;
                        
                        // Update tech stack
                        if (serviceTech && data.tech) {
                            serviceTech.innerHTML = data.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');
                        }

                        serviceDisplay.style.opacity = '1';
                        serviceDisplay.style.transform = 'translateY(0)';
                    }, 300);
                }
            });
        });
    }

    // FAQ Accordion logic
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all others
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // About Page Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-tab');
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }

    // Page Stat Counters (Supports both .stat-num and .stat-number)
    const stats = document.querySelectorAll('.stat-num, .stat-number');
    if (stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetText = entry.target.getAttribute('data-target');
                    if (!targetText) return;
                    
                    const target = parseInt(targetText);
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 10);
                    const timer = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            entry.target.textContent = target;
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = Math.floor(count);
                        }
                    }, 10);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        stats.forEach(s => observer.observe(s));
    }

    console.log('Brandzoo Website Loaded');
});
