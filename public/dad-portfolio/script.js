// JavaScript for Vikas Gupta Executive Portfolio

document.addEventListener('DOMContentLoaded', () => {
    // 1. Stats Counter Animation
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-value');
        const speed = 80; // Speed of count increment in ms

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Calculate increment speed dynamically
                const increment = Math.ceil(target / speed);

                if (count < target) {
                    counter.innerText = count + increment;
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger counters animation immediately
    animateCounters();

    // 2. Pillars Tab Switcher
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Deactivate all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Deactivate all contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate clicked button and target content
            button.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealItems = document.querySelectorAll('.reveal');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealItems.forEach(item => {
        revealOnScroll.observe(item);
    });

    // 4. Contact Form Submission (Simulation)
    const contactForm = document.getElementById('portfolio-contact-form');
    const successMsg = document.getElementById('form-success-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Select submit button and show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending Message <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulate server network latency of 1.5 seconds
            setTimeout(() => {
                // Fade out form and display success panel
                contactForm.classList.add('hide');
                successMsg.classList.remove('hide');
                successMsg.style.animation = 'fadeIn 0.5s ease-out forwards';
            }, 1500);
        });
    }

    // 5. Skills Grid Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from other buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                    // Add simple scale-in animation transition
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 6. Navigation Links Active Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
