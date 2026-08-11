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
            document.body.classList.toggle('nav-open');
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
                document.body.classList.remove('nav-open');
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
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121082.40899362125!2d73.68069399726558!3d18.491571699999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf480eda6c3b%3A0xef8305a9d2815baa!2sModern%20Salon%20%26%20Academy!5e0!3m2!1sen!2sin!4v1786448782308!5m2!1sen!2sin',
                link: 'https://maps.google.com/?q=Modern+Salon+and+Academy+Sinhagad+Road+Pune',
                type: 'Unisex Salon',
                phone: '9272002036',
                phoneFormatted: '92720 02036',
                name: 'Sinhagad Road (Academy)',
                est: 2024,
                desc: 'Our premier hair academy and luxury salon flagship.',
                images: []
            },
            'nanded': {
                address: 'Shop 12, Destination Center,<br>Nanded City, Sinhagad Road,<br>Pune, Maharashtra 411041',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121097.23400140852!2d73.6715405972656!3d18.47058389999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2959bcd22a711%3A0x5de90f679ca95d40!2sMODERN%20FAMILY%20SALON!5e0!3m2!1sen!2sin!4v1786185769318!5m2!1sen!2sin',
                link: 'https://maps.google.com/?q=Modern+Hair+Salon+Nanded+City+Pune',
                type: 'Unisex Salon',
                phone: '8080866944',
                phoneFormatted: '80808 66944',
                name: 'Nanded City',
                est: 2015,
                desc: 'A modern salon experience in the heart of Nanded City. Equipped with top-tier amenities and expert stylists, we offer customized hair, skin, and grooming treatments in a relaxed environment.',
                images: ['ModernPhotos/ShopLocation.jpeg', 'ModernPhotos/Chairs3.jpeg', 'ModernPhotos/Entrance.jpeg']
            },
            'goelganga': {
                address: 'Sahyadri Heights. Shop no 5,<br>Goel Ganga Road, Sinhagad Road, Manik Baug,<br>Niranjan Park, Anand Nagar, Pune, Maharashtra 411051',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121097.23400140852!2d73.6715405972656!3d18.47058389999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc29558d242a091%3A0x419f1a3717c979cc!2sModern%20Unisex%20Salon!5e0!3m2!1sen!2sin!4v1786185685125!5m2!1sen!2sin',
                link: 'https://maps.google.com/?q=Modern+Hair+Salon+Goel+Ganga+Pune',
                type: 'Unisex Salon',
                phone: '8080866944',
                phoneFormatted: '80808 66944',
                name: 'Goel Ganga',
                est: 2014,
                desc: 'Located at Sahyadri Heights near Manik Baug, this branch is known for its sophisticated styling and premium personal care. Experience luxury hair care and premium salon treatments by our top-trained professionals.',
                images: ['ModernPhotos/Chairs2.jpeg', 'ModernPhotos/AdvancedChairs2.jpeg', 'ModernPhotos/products.jpeg']
            },
            'navshya': {
                address: 'Near Shri Navshya Maruti Mandir, Sinhagad Road,<br>Ganesh Mala, Pune, Maharashtra 411030',
                map: 'https://maps.google.com/maps?q=Shri+Navshya+Maruti+Mandir+Ganesh+Mala+Pune&output=embed',
                link: 'https://maps.google.com/?q=Shri+Navshya+Maruti+Mandir+Ganesh+Mala+Pune',
                type: 'Unisex Salon',
                phone: '7499280567',
                phoneFormatted: '74992 80567',
                name: 'Navshya Maruti',
                est: 2005,
                desc: 'Our boutique salon near Shri Navshya Maruti Mandir offers a personalized and peaceful care environment. We specialize in bespoke styling, hair coloring, and rejuvenating hair spa treatments.',
                images: ['ModernPhotos/Products2.jpeg', 'ModernPhotos/Chairs.jpeg', 'ModernPhotos/AdvnacedChairs.jpeg']
            },
            'ganeshmala': {
                address: 'opp. Rohan Kritika, near Aditya Nakoda Bldg,<br>Sarita Vihar Phase 2, Ganesh Mala,<br>Pune, Maharashtra 411030',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60538.37220408265!2d73.77250286172479!3d18.499584999999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf0af25cbe55%3A0x1e72e946d2213f!2sModern%20Unisex%20Salon!5e0!3m2!1sen!2sin!4v1786451567499!5m2!1sen!2sin',
                link: 'https://maps.google.com/?q=Modern+Salon+and+Academy+Ganesh+Mala+Pune',
                type: "Only Men's Parlour",
                phone: '9881434380',
                phoneFormatted: '98814 34380',
                name: 'Ganesh Mala',
                est: 1993,
                desc: 'Our signature flagship experience at Ganesh Mala. Established in 1993, this location is our longest-running flagship Unisex Salon & Men\'s Parlour, setting the benchmark for precision hair styling and luxury care in Pune.',
                images: ['ModernPhotos/Chairs4.jpeg', 'ModernPhotos/products.jpeg', 'ModernPhotos/Entrance.jpeg']
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
            const phoneEl = document.getElementById('location-phone');

            const shopInfoSec = document.getElementById('shop-info');
            const shopEstEl = document.getElementById('shop-est');
            const shopTitleEl = document.getElementById('shop-title');
            const shopDescEl = document.getElementById('shop-desc');
            const shopImg1 = document.getElementById('shop-img-1');
            const shopImg2 = document.getElementById('shop-img-2');
            const shopImg3 = document.getElementById('shop-img-3');

            // Add a fade out/in effect
            const contactSection = document.querySelector('.contact-info');
            const mapContainer = document.querySelector('.map-container');
            const shopDetailsContainer = document.querySelector('.shop-details');
            const shopGalleryContainer = document.querySelector('.shop-gallery-container');

            if (contactSection) contactSection.style.opacity = '0';
            if (mapContainer) mapContainer.style.opacity = '0';
            if (shopDetailsContainer) shopDetailsContainer.style.opacity = '0';
            if (shopGalleryContainer) shopGalleryContainer.style.opacity = '0';

            setTimeout(() => {
                addressEl.innerHTML = data.address;
                typeEl.innerHTML = data.type;
                mapEl.src = data.map;
                linkEl.href = data.link;
                if (phoneEl) {
                    phoneEl.href = `tel:${data.phone}`;
                    phoneEl.innerHTML = data.phoneFormatted;
                }

                if (shopInfoSec && data.est && locationId !== 'sinhagad') {
                    shopEstEl.innerHTML = `ESTABLISHED IN ${data.est}`;
                    shopTitleEl.innerHTML = data.name;
                    shopDescEl.innerHTML = data.desc;
                    if (shopImg1 && data.images[0]) shopImg1.src = data.images[0];
                    if (shopImg2 && data.images[1]) shopImg2.src = data.images[1];
                    if (shopImg3 && data.images[2]) shopImg3.src = data.images[2];
                    shopInfoSec.style.display = 'block';
                } else if (shopInfoSec) {
                    shopInfoSec.style.display = 'none';
                }

                if (contactSection) contactSection.style.opacity = '1';
                if (mapContainer) mapContainer.style.opacity = '1';
                if (shopDetailsContainer) shopDetailsContainer.style.opacity = '1';
                if (shopGalleryContainer) shopGalleryContainer.style.opacity = '1';
            }, 300);

            // Scroll to the shop info section or contact section
            setTimeout(() => {
                const targetSec = (shopInfoSec && data.est && locationId !== 'sinhagad') ? shopInfoSec : document.getElementById('contact');
                targetSec.scrollIntoView({ behavior: 'smooth' });
            }, 100);
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

    // Reviews Carousel
    const reviewsTrack = document.querySelector('.reviews-track');
    const reviewsPrev = document.getElementById('reviews-prev');
    const reviewsNext = document.getElementById('reviews-next');
    const reviewCards = document.querySelectorAll('.review-card');

    if (reviewsTrack && reviewsPrev && reviewsNext && reviewCards.length > 0) {
        let reviewIndex = 0;

        const getVisibleCardsCount = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 991) return 2;
            return 3;
        };

        const updateReviewsCarousel = () => {
            const card = reviewCards[0];
            const cardWidth = card.getBoundingClientRect().width;
            const gap = parseFloat(window.getComputedStyle(reviewsTrack).gap) || 0;
            
            const visibleCards = getVisibleCardsCount();
            const maxIndex = Math.max(0, reviewCards.length - visibleCards);
            if (reviewIndex > maxIndex) reviewIndex = maxIndex;
            if (reviewIndex < 0) reviewIndex = 0;

            reviewsTrack.style.transform = `translateX(-${reviewIndex * (cardWidth + gap)}px)`;

            reviewsPrev.style.opacity = reviewIndex === 0 ? '0.3' : '1';
            reviewsPrev.style.pointerEvents = reviewIndex === 0 ? 'none' : 'auto';
            
            reviewsNext.style.opacity = reviewIndex === maxIndex ? '0.3' : '1';
            reviewsNext.style.pointerEvents = reviewIndex === maxIndex ? 'none' : 'auto';
        };

        reviewsNext.addEventListener('click', () => {
            const visibleCards = getVisibleCardsCount();
            const maxIndex = Math.max(0, reviewCards.length - visibleCards);
            if (reviewIndex < maxIndex) {
                reviewIndex++;
                updateReviewsCarousel();
            }
        });

        reviewsPrev.addEventListener('click', () => {
            if (reviewIndex > 0) {
                reviewIndex--;
                updateReviewsCarousel();
            }
        });

        updateReviewsCarousel();
        window.addEventListener('resize', () => {
            setTimeout(updateReviewsCarousel, 100);
        });
    }
});
