// assets/src/nav.js
(function() {
    'use strict';
    
    // Элементы навигации
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('mainNav');
    const langToggleBtn = document.getElementById('langToggleBtn');
    const langDropdown = document.getElementById('langDropdown');
    
    // Состояние меню
    let isMenuOpen = false;
    let isLangOpen = false;
    let touchStartY = 0;
    let scrollPosition = 0;
    
    // Создаем оверлей, если его нет
    function createOverlay() {
        if (!document.querySelector('.nav-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
            return overlay;
        }
        return document.querySelector('.nav-overlay');
    }
    
    const overlay = createOverlay();
    
    // Функция блокировки прокрутки
    function lockScroll() {
        scrollPosition = window.pageYOffset;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
    }
    
    // Функция разблокировки прокрутки
    function unlockScroll() {
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('position');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('width');
        window.scrollTo(0, scrollPosition);
    }
    
    // Функция открытия меню
    function openMenu() {
        if (!navLinks || !mobileBtn) return;
        
        isMenuOpen = true;
        
        // Удаляем предыдущие классы анимаций
        navLinks.classList.remove('menu-closing');
        
        // Добавляем классы для открытия
        navLinks.classList.add('menu-open');
        mobileBtn.classList.add('active');
        overlay.classList.add('show');
        
        // Меняем иконку
        const icon = mobileBtn.querySelector('i');
        if (icon) {
            icon.className = 'fa-solid fa-xmark';
        }
        
        // Блокируем прокрутку на мобильных
        if (window.innerWidth <= 768) {
            lockScroll();
        }
        
        // Анимируем пункты меню
        const links = navLinks.querySelectorAll('a');
        links.forEach((link, index) => {
            link.style.animation = `slideInLink 0.3s ease forwards ${index * 0.05}s`;
        });
    }
    
    // Функция закрытия меню
    function closeMenu() {
        if (!navLinks || !mobileBtn) return;
        
        isMenuOpen = false;
        
        // Добавляем класс для анимации закрытия
        navLinks.classList.add('menu-closing');
        navLinks.classList.remove('menu-open');
        mobileBtn.classList.remove('active');
        overlay.classList.remove('show');
        
        // Меняем иконку обратно
        const icon = mobileBtn.querySelector('i');
        if (icon) {
            icon.className = 'fa-solid fa-bars';
        }
        
        // Разблокируем прокрутку
        unlockScroll();
        
        // Очищаем анимации пунктов меню после закрытия
        setTimeout(() => {
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.style.animation = '';
            });
        }, 300);
    }
    
    // Функция переключения меню
    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Обработчик свайпа для закрытия меню
    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
    }
    
    function handleTouchMove(e) {
        if (!isMenuOpen || window.innerWidth > 768) return;
        
        const touchY = e.touches[0].clientY;
        const diff = touchY - touchStartY;
        
        // Если свайп вверх, начинаем закрывать меню
        if (diff < -50) {
            closeMenu();
        }
    }
    
    // Инициализация обработчиков событий
    if (mobileBtn && navLinks) {
        // Клик по кнопке меню
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Клик по оверлею
        overlay.addEventListener('click', () => {
            if (isMenuOpen) {
                closeMenu();
            }
        });
        
        // Клик по ссылкам в меню
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                // Не закрываем при клике на активную ссылку
                if (link.classList.contains('active')) {
                    e.preventDefault();
                }
                
                if (isMenuOpen && window.innerWidth <= 768) {
                    // Небольшая задержка для визуального отклика
                    setTimeout(() => {
                        closeMenu();
                    }, 150);
                }
            });
        });
        
        // Свайпы для мобильных
        if ('ontouchstart' in window) {
            navLinks.addEventListener('touchstart', handleTouchStart, { passive: true });
            navLinks.addEventListener('touchmove', handleTouchMove, { passive: true });
        }
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
        
        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
            
            // Сброс стилей при переходе на десктоп
            if (window.innerWidth > 768) {
                navLinks.style = '';
                navLinks.classList.remove('menu-open', 'menu-closing');
                if (mobileBtn.classList.contains('active')) {
                    mobileBtn.classList.remove('active');
                }
                
                // Возвращаем иконку
                const icon = mobileBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-bars';
                }
                
                // Разблокируем прокрутку
                unlockScroll();
            }
        });
        
        // Предотвращаем всплытие кликов внутри меню
        navLinks.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Обработка дропдауна языка
    if (langToggleBtn && langDropdown) {
        langToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isLangOpen = !isLangOpen;
            
            if (isLangOpen) {
                langDropdown.classList.add('show');
                langToggleBtn.classList.add('active');
            } else {
                langDropdown.classList.remove('show');
                langToggleBtn.classList.remove('active');
            }
        });
        
        // Закрытие дропдауна при клике вне
        document.addEventListener('click', (e) => {
            if (!langToggleBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('show');
                langToggleBtn.classList.remove('active');
                isLangOpen = false;
            }
        });
        
        // Обработка выбора языка
        const langLinks = langDropdown.querySelectorAll('a');
        langLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = link.getAttribute('data-lang');
                const currentLangLabel = document.getElementById('currentLangLabel');
                
                if (currentLangLabel) {
                    currentLangLabel.textContent = lang.toUpperCase();
                }
                
                langDropdown.classList.remove('show');
                langToggleBtn.classList.remove('active');
                isLangOpen = false;
                
                // Здесь можно добавить вызов функции смены языка
                if (window.changeLanguage) {
                    window.changeLanguage(lang);
                }
            });
        });
    }
    
    // Активная ссылка в навигации
    function setActiveLink() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.nav-links a');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '/' && href === '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Вызываем при загрузке
    setActiveLink();
    
    // Экспортируем функции для глобального использования
    window.navUtils = {
        openMenu,
        closeMenu,
        toggleMenu
    };
    
    // Логирование для отладки
    console.log('✅ Навигация с анимациями загружена');
})();