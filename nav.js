console.log('file nav.js loaded');

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const closeMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileOverlay');
    
    console.log('Elements loaded:', { menuToggle, closeMenu, mobileMenu, overlay });
    
    if (menuToggle && mobileMenu && overlay) {
        console.log('All mobile menu elements found');
        
        menuToggle.addEventListener('click', function(e) {
            console.log('Menu toggle clicked');
            e.stopPropagation(); 
            mobileMenu.classList.add('open');
            overlay.classList.add('active');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', function(e) {
            console.log('Close menu clicked');
            e.stopPropagation();
            closeMobileMenu();
        });
        
        overlay.addEventListener('click', function(e) {
            console.log('Overlay clicked');
            e.stopPropagation();
            closeMobileMenu();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                console.log('ESC pressed');
                closeMobileMenu();
            }
        });
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('open') && 
                !mobileMenu.contains(e.target) && 
                e.target !== menuToggle) {
                console.log('Clicked outside menu');
                closeMobileMenu();
            }
        });
        
        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
            overlay.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        menuToggle.addEventListener('mousedown', function() {
            console.log('Menu toggle mousedown');
        });
        
        menuToggle.addEventListener('touchstart', function() {
            console.log('Menu toggle touchstart');
        });
        
    } else {
        console.error('Some mobile menu elements are missing:', {
            menuToggle: !!menuToggle,
            mobileMenu: !!mobileMenu,
            overlay: !!overlay
        });
    }
});