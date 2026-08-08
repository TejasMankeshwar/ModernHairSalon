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
                address: 'Opp. Rohan Kritika, Next to Aditya Nakoda Society,<br>Sinhgad Road, Pune - 411030',
                map: 'https://www.google.com/maps?q=Modern+Salon+and+Academy+Dattawadi+Pune+Sarita+Vihar+Phase+2+Rohan+Kritika&output=embed',
                link: 'https://maps.google.com/?q=Modern+Salon+and+Academy+Dattawadi+Pune',
                type: 'Unisex Salon'
            },
            'goelganga': {
                address: 'Goel Ganga Commercial Complex,<br>Opp. Nanded City Entrance, Sinhagad Road,<br>Pune, Maharashtra 411041',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121097.23400140852!2d73.6715405972656!3d18.47058389999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc29558d242a091%3A0x419f1a3717c979cc!2sModern%20Unisex%20Salon!5e0!3m2!1sen!2sin!4v1786185685125!5m2!1sen!2sin',
                link: 'https://maps.google.com/?q=Modern+Hair+Salon+Goel+Ganga+Pune',
                type: 'Unisex Salon'
            },
            'nanded': {
                address: 'Shop 12, Destination Center,<br>Nanded City, Sinhagad Road,<br>Pune, Maharashtra 411041',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121097.23400140852!2d73.6715405972656!3d18.47058389999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2959bcd22a711%3A0x5de90f679ca95d40!2sMODERN%20FAMILY%20SALON!5e0!3m2!1sen!2sin!4v1786185769318!5m2!1sen!2sin',
                link: 'https://maps.google.com/?q=Modern+Hair+Salon+Nanded+City+Pune',
                type: 'Unisex Salon'
            },
            'dattawadi': {
                address: 'opp. Rohan Kritika, near Aditya Nakoda Bldg,<br>Sarita Vihar Phase 2, Dattawadi,<br>Pune, Maharashtra 411030',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121097.23400140852!2d73.6715405972656!3d18.47058389999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf0af25cbe55%3A0x1e72e946d2213f!2sModern%20Unisex%20Salon!5e0!3m2!1sen!2sin!4v1786185742770!5m2!1sen!2sin',
                link: 'https://maps.google.com/?q=Modern+Salon+and+Academy+Dattawadi+Pune',
                type: "Only Men's Parlour"
            },
            'karvenagar': {
                address: 'Shop No. 2, Sahawas Society,<br>Opp. Cummins College, Karvenagar,<br>Pune, Maharashtra 411052',
                map: 'https://www.google.com/maps?q=Modern+Hair+Salon+Karvenagar+Pune&output=embed',
                link: 'https://maps.google.com/?q=Modern+Hair+Salon+Karvenagar+Pune',
                type: 'Unisex Salon'
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
            const typeEl = document.getElementById('location-type');
            const mapEl = document.getElementById('location-map');
            const linkEl = document.getElementById('location-link');

            // Add a fade out/in effect
            const contactSection = document.querySelector('.contact-info');
            const mapContainer = document.querySelector('.map-container');

            contactSection.style.opacity = '0';
            mapContainer.style.opacity = '0';

            setTimeout(() => {
                addressEl.innerHTML = data.address;
                typeEl.innerHTML = data.type;
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
                e.stopPropagation();
                const slide = btn.closest('.carousel-slide');
                const locationId = slide.getAttribute('data-location');
                
                if (locationId === 'sinhagad') {
                    window.location.href = 'academy.html';
                } else {
                    updateLocationSection(locationId);
                }
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

    // Lightbox Modal for Gallery Photos
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const closeLightbox = document.getElementById('closeLightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightbox && (lightboxImg || lightboxVideo) && closeLightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const video = item.querySelector('video');
                
                if (img) {
                    if (lightboxVideo) {
                        lightboxVideo.style.display = 'none';
                        lightboxVideo.src = '';
                    }
                    if (lightboxImg) {
                        lightboxImg.src = img.src;
                        lightboxImg.alt = img.alt;
                        lightboxImg.style.display = 'block';
                    }
                    lightbox.classList.add('active');
                    document.body.classList.add('modal-open');
                } else if (video) {
                    if (lightboxImg) {
                        lightboxImg.style.display = 'none';
                        lightboxImg.src = '';
                    }
                    if (lightboxVideo) {
                        lightboxVideo.src = video.src;
                        lightboxVideo.style.display = 'block';
                    }
                    lightbox.classList.add('active');
                    document.body.classList.add('modal-open');
                }
            });
        });

        const hideLightbox = () => {
            lightbox.classList.remove('active');
            document.body.classList.remove('modal-open');
            if (lightboxImg) {
                lightboxImg.src = '';
            }
            if (lightboxVideo) {
                lightboxVideo.pause();
                lightboxVideo.src = '';
            }
        };

        closeLightbox.addEventListener('click', hideLightbox);

        // Close on click outside the media
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                hideLightbox();
            }
        });

        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                hideLightbox();
            }
        });
    }
});
