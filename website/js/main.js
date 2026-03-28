// Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle (Mobile)
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            // Basic toggle for now, can be enhanced with animation
            alert('Mobile menu clicked - To be implemented with animation');
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
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
            img: 'images/services/social-media.png'
        },
        'seo': {
            title: 'Search Engine Optimization',
            desc: "Be seen where it matters most. Our SEO experts climb the search rankings to ensure your brand is the king of the organic jungle. We optimize every pixel and word for maximum visibility, driving sustainable organic growth.",
            img: 'images/services/seo.png'
        },
        'ppc': {
            title: 'PPC Service',
            desc: "Fast-track your reach with surgical precision. Our Paid Search campaigns are optimized for conversion, ensuring every cent of your budget works as hard as a hunting predator to bring you high-quality leads.",
            img: 'images/services/ppc.png'
        },
        'influencer': {
            title: 'Influencer Marketing',
            desc: "Leverage the power of the pack. We connect you with the right voices to amplify your brand message authentically across the digital landscape, building trust and engagement through influential partnerships.",
            img: 'images/services/influencer.png'
        },
        'playstore-reviews': {
            title: 'Playstore reviews',
            desc: "Boost your app's credibility with authentic Playstore reviews. We help you build a trustworthy profile that encourages more downloads and improves your app store ranking, ensuring your app stands out in a crowded marketplace.",
            img: 'images/services/playstore.png'
        },
        'web-dev': {
            title: 'Website Development',
            desc: "Your digital lair, built to last. We create high-performance, custom websites that are as functional as they are beautiful, ensuring a seamless experience across all devices.",
            img: 'images/services/web-dev.png'
        },
        'creative-design': {
            title: 'Creative Designing',
            desc: "Visuals that leave a lasting paw-print. From branding to UI, our designs capture the wild essence of your unique brand identity and communicate your message with creative flair.",
            img: 'images/services/creative-design.png'
        },
        'ugc-videos': {
            title: 'UGC Videos',
            desc: "Authentic content that converts. Our UGC (User Generated Content) video strategies leverage real users to tell your brand story, creating high-engagement social proof that resonates with your audience and builds genuine trust.",
            img: 'images/services/ugc.png'
        },
        'ui-ux': {
            title: 'UI/UX Design',
            desc: "User experiences that feel like second nature. We design intuitive, seamless journeys that keep your customers coming back for more, focusing on accessibility and visual delight.",
            img: 'images/services/ui-ux.png'
        },
        'orm': {
            title: 'Online Reputation Management(ORM)',
            desc: "Protect your territory. We manage your online reputation to ensure your brand's bark is always as good as its bite, suppressing negatives and amplifying the positive stories.",
            img: 'images/services/orm.png'
        },
        'digital-marketing': {
            title: 'Digital marketing',
            desc: "The complete digital roar. We craft comprehensive digital marketing strategies that unite all channels—social, search, and paid—into a single, high-performance hunting pack for your brand, driving measurable results and market dominance.",
            img: 'images/services/digital-marketing.png'
        },
        'wordpress': {
            title: 'WordPress Website Development',
            desc: "Flexible, powerful, and easy to manage. We build custom WordPress solutions tailored to your business's unique needs, from blogs to complex enterprise platforms.",
            img: 'images/services/wordpress.png'
        }
    };

    const servicePills = document.querySelectorAll('.service-pill');
    const serviceImg = document.getElementById('service-img');
    const serviceTitle = document.getElementById('service-title');
    const serviceDesc = document.getElementById('service-desc');
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

                        serviceDisplay.style.opacity = '1';
                        serviceDisplay.style.transform = 'translateY(0)';
                    }, 300);
                }
            });
        });
    }

    console.log('Brandzoo Website Loaded');
});
