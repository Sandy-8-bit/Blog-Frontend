window.initScrollAnimation = function () {
    // Check if IntersectionObserver is available
    if ('IntersectionObserver' in window) {
        const cards = document.querySelectorAll('.animate-on-scroll');

        // Configure the observer
        const options = {
            root: null, // Use viewport as the root
            rootMargin: '0px', // No margin
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        // Create the observer
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If the card is in view
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    entry.target.classList.remove('animate-out');
                } else {
                    // Only add animate-out if the card has already been animated in
                    if (entry.target.classList.contains('animate-in')) {
                        entry.target.classList.remove('animate-in');
                        entry.target.classList.add('animate-out');
                    }
                }
            });
        }, options);

        // Observe each card
        cards.forEach(card => {
            observer.observe(card);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const cards = document.querySelectorAll('.animate-on-scroll');
        cards.forEach(card => {
            // Add animate-in class by default
            card.classList.add('animate-in');
        });

        // Handle animation on scroll with scroll event
        window.addEventListener('scroll', function () {
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;

                // Check if card is in viewport
                if (rect.top <= windowHeight * 0.9 && rect.bottom >= windowHeight * 0.1) {
                    card.classList.add('animate-in');
                    card.classList.remove('animate-out');
                } else {
                    if (card.classList.contains('animate-in')) {
                        card.classList.remove('animate-in');
                        card.classList.add('animate-out');
                    }
                }
            });
        });

        // Trigger initial check
        window.dispatchEvent(new Event('scroll'));
    }
};