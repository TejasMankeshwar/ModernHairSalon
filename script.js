document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Navigation Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Carousel Logic
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    const dots = Array.from(document.querySelectorAll('.dot'));

    if (track && slides.length > 0) {
        let currentIndex = 0;
        let slideWidth = slides[0].getBoundingClientRect().width;

        const locationsData = {
            'sinhagad': {
                address: 'Shop No. 4, Sun Universe, Phase 2,<br>Near Manik Baug, Sinhagad Road,<br>Pune, Maharashtra 411041',
                map: 'https://www.google.com/maps?q=Modern+Hair+Salon+Sinhagad+Road+Pune&output=embed',
                link: 'https://maps.google.com/?q=Modern+Hair+Salon+Sinhagad+Road+Pune'
            },
            'goelganga': {
                address: 'Goel Ganga Commercial Complex,<br>Opp. Nanded City Entrance, Sinhagad Road,<br>Pune, Maharashtra 411041',
                map: 'https://www.google.com/maps?q=Modern+Hair+Salon+Goel+Ganga+Pune&output=embed',
                link: 'https://maps.google.com/?q=Modern+Hair+Salon+Goel+Ganga+Pune'
            },
            'nanded': {
                address: 'Shop 12, Destination Center,<br>Nanded City, Sinhagad Road,<br>Pune, Maharashtra 411041',
                map: 'https://www.google.com/maps?q=Modern+Hair+Salon+Nanded+City+Pune&output=embed',
                link: 'https://maps.google.com/?q=Modern+Hair+Salon+Nanded+City+Pune'
            },
            'dattawadi': {
                address: 'opp. Rohan Kritika, near Aditya Nakoda Bldg,<br>Sarita Vihar Phase 2, Dattawadi,<br>Pune, Maharashtra 411030',
                map: 'https://www.google.com/maps?q=Modern+Salon+and+Academy+Dattawadi+Pune+Sarita+Vihar+Phase+2+Rohan+Kritika&output=embed',
                link: 'https://maps.google.com/?q=Modern+Salon+and+Academy+Dattawadi+Pune'
            },
            'karvenagar': {
                address: 'Shop No. 2, Sahawas Society,<br>Opp. Cummins College, Karvenagar,<br>Pune, Maharashtra 411052',
                map: 'https://www.google.com/maps?q=Modern+Hair+Salon+Karvenagar+Pune&output=embed',
                link: 'https://maps.google.com/?q=Modern+Hair+Salon+Karvenagar+Pune'
            }
        };

        const updateCarousel = () => {
            slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };

        const updateLocationSection = (locationId) => {
            const data = locationsData[locationId];
            if (!data) return;

            const addressEl = document.getElementById('location-address');
            const mapEl = document.getElementById('location-map');
            const linkEl = document.getElementById('location-link');

            // Add a fade out/in effect
            const contactSection = document.querySelector('.contact-info');
            const mapContainer = document.querySelector('.map-container');

            contactSection.style.opacity = '0';
            mapContainer.style.opacity = '0';

            setTimeout(() => {
                addressEl.innerHTML = data.address;
                mapEl.src = data.map;
                linkEl.href = data.link;

                contactSection.style.opacity = '1';
                mapContainer.style.opacity = '1';
            }, 300);

            // Scroll to contact section
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        };

        const moveToNext = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        };

        const moveToPrev = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        };

        nextButton.addEventListener('click', () => {
            moveToNext();
            resetAutoPlay();
        });

        prevButton.addEventListener('click', () => {
            moveToPrev();
            resetAutoPlay();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                resetAutoPlay();
            });
        });

        // Click on Visit Button to update location
        const visitButtons = document.querySelectorAll('.visit-btn');
        visitButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent slide click if any
                const slide = btn.closest('.carousel-slide');
                const locationId = slide.getAttribute('data-location');
                updateLocationSection(locationId);
                resetAutoPlay();
            });
        });

        // Auto Play
        let autoPlay = setInterval(moveToNext, 5000);

        const resetAutoPlay = () => {
            clearInterval(autoPlay);
            autoPlay = setInterval(moveToNext, 5000);
        };

        // Pause on hover
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlay));
        carouselContainer.addEventListener('mouseleave', () => resetAutoPlay());

        // Handle window resize
        window.addEventListener('resize', updateCarousel);
    }
});
