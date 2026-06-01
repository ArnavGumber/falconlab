// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const notification = document.getElementById('contact-notification');
    const closeButton = document.getElementById('notification-close');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (closeButton && notification) {
        closeButton.addEventListener('click', () => {
            notification.classList.add('hidden');
        });
    }
});
