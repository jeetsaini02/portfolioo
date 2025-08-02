document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('closeBtn');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Highlight active menu item based on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                const id = section.getAttribute('id');
                document.querySelectorAll('.navbar a, .mobile-menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}` || (id === 'home' && link.getAttribute('href') === '#')) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Sticky header
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });

    // Slider
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    const slideCount = slides.length;

    function goToSlide(index) {
        sliderTrack.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        currentSlide = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }, 5000);

    // Chatbot
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatInput = document.querySelector('.chatbot-input input');
    const chatSendBtn = document.querySelector('.chatbot-input button');
    const chatMessages = document.querySelector('.chatbot-messages');

    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
    });

    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    const botResponses = [
        "I'm a PHP and WordPress developer with 5+ years of experience.",
        "I specialize in custom WordPress theme and plugin development.",
        "My hourly rate varies depending on project complexity. You can check my pricing packages for more details.",
        "Typically, a basic WordPress website takes about 2-3 weeks to complete.",
        "Yes, I provide ongoing maintenance and support for all my projects.",
        "You can contact me directly through the contact form on my website or via WhatsApp."
    ];

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const userMessage = document.createElement('div');
            userMessage.className = 'chatbot-message user';
            userMessage.innerHTML = `<div class="message-content">${message}</div>`;
            chatMessages.appendChild(userMessage);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                const response = botResponses[Math.floor(Math.random() * botResponses.length)];
                const botMessage = document.createElement('div');
                botMessage.className = 'chatbot-message bot';
                botMessage.innerHTML = `<div class="message-content">${response}</div>`;
                chatMessages.appendChild(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }

    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Animate Skill Bars
    const skillBars = document.querySelectorAll('.skill-progress');
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    const aboutSection = document.querySelector('.about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);

    // Orbiting Tech Skills
    const orbitContainer = document.querySelector('.tech-circle');
    const techSkills = ['HTML5', 'CSS3', 'JS', 'PHP', 'WP', 'MySQL', 'API', 'Git', 'SASS', 'Bootstrap'];
    const centerX = orbitContainer.offsetWidth / 2;
    const centerY = orbitContainer.offsetHeight / 2;
    const radius = 120;

    techSkills.forEach((skill, index) => {
        const angle = index * (2 * Math.PI / techSkills.length);
        const x = centerX + radius * Math.cos(angle) - 35;
        const y = centerY + radius * Math.sin(angle) - 35;

        const element = document.createElement('div');
        element.className = 'orbiting-element';
        element.textContent = skill;
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.dataset.originalX = x;
        element.dataset.originalY = y;
        orbitContainer.appendChild(element);
    });

    const animationContainer = document.getElementById('techOrbit');

    animationContainer.addEventListener('mousemove', (e) => {
        const rect = animationContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - centerX;
        const mouseY = e.clientY - rect.top - centerY;
        const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
        const maxDistance = 200;
        const orbitingElements = document.querySelectorAll('.orbiting-element');

        orbitingElements.forEach(element => {
            const originalX = parseFloat(element.dataset.originalX);
            const originalY = parseFloat(element.dataset.originalY);

            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const offsetX = mouseX * force * 0.3;
                const offsetY = mouseY * force * 0.3;
                element.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + force * 0.1})`;
            } else {
                element.style.transform = 'translate(0, 0) scale(1)';
            }
        });

        const centerCircle = document.querySelector('.center-circle');
        const centerForce = Math.min(distance / 100, 0.5);
        centerCircle.style.transform = `scale(${1 + centerForce * 0.1})`;
    });

    animationContainer.addEventListener('mouseleave', () => {
        const orbitingElements = document.querySelectorAll('.orbiting-element');
        orbitingElements.forEach(element => {
            element.style.transform = 'translate(0, 0) scale(1)';
        });
        document.querySelector('.center-circle').style.transform = 'scale(1)';
    });

    let autoRotate = true;
    let rotationAngle = 0;

    function autoRotateOrbit() {
        if (autoRotate) {
            rotationAngle += 0.002;
            const orbitingElements = document.querySelectorAll('.orbiting-element');
            orbitingElements.forEach((element, index) => {
                const angle = index * (2 * Math.PI / techSkills.length) + rotationAngle;
                const x = centerX + radius * Math.cos(angle) - 35;
                const y = centerY + radius * Math.sin(angle) - 35;
                element.style.left = `${x}px`;
                element.style.top = `${y}px`;
                element.dataset.originalX = x;
                element.dataset.originalY = y;
            });
        }
        requestAnimationFrame(autoRotateOrbit);
    }

    animationContainer.addEventListener('mouseenter', () => {
        autoRotate = false;
    });

    animationContainer.addEventListener('mouseleave', () => {
        autoRotate = true;
    });

    autoRotateOrbit();
});
