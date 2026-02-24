// ===== res/src/nav.js =====
// Простое выдвигающееся меню

document.addEventListener('DOMContentLoaded', function() {
    // Создаем структуру меню
    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.innerHTML = `
        <div class="nav-container">
            <div class="nav-brand">
                <img src="res/io/sqicon.png" alt="Folltawn" class="nav-icon-img">
                <a href="/" class="nav-logo">
                    Folltawn
                </a>
            </div>
            
            <button class="nav-toggle" id="navToggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <div class="nav-menu" id="navMenu">
                <ul class="nav-list">
                    <!-- Замените ссылки на свои -->
                    <li><a href="/" class="nav-link">Главная</a></li>
                    <li><a href="/projects" class="nav-link">Проекты</a></li>
                    <li><a href="/blog" class="nav-link">Блог</a></li>
                    <li><a href="/about" class="nav-link">О себе</a></li>
                    <li><a href="/settings" class="nav-link">Настройки</a></li>
                </ul>
            </div>
        </div>
    `;
    
    // Вставляем меню в начало body
    document.body.insertBefore(nav, document.body.firstChild);
    
    // Добавляем отступ для контента
    document.body.style.paddingTop = '70px';
    
    // Логика открытия/закрытия меню
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Закрываем меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Закрываем меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Подсвечиваем активную ссылку
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});