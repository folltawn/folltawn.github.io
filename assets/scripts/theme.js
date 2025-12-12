document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const themeModal = document.getElementById('themeModal');
  const closeBtn = themeModal.querySelector('.close-btn');
  const cancelBtn = document.getElementById('cancelBtn');
  const saveBtn = document.getElementById('saveBtn');
  const themeRadios = document.querySelectorAll('input[name="theme"]');
  const root = document.documentElement;
  
  // Текущая выбранная тема в модалке
  let selectedTheme = null;
  
  // Восстанавливаем сохранённую тему при загрузке
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
    // Устанавливаем соответствующий radio в модалке
    const radioToCheck = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
    if (radioToCheck) {
      radioToCheck.checked = true;
    }
  } else {
    // Если темы нет в localStorage, проверяем radio "default"
    const defaultRadio = document.querySelector('input[name="theme"][value="default"]');
    if (defaultRadio) {
      defaultRadio.checked = true;
    }
  }
  
  // Открытие модального окна
  themeToggle.addEventListener('click', function() {
    // Загружаем текущую тему в модалку
    const currentTheme = root.getAttribute('data-theme') || 'default';
    const currentRadio = document.querySelector(`input[name="theme"][value="${currentTheme}"]`);
    if (currentRadio) {
      currentRadio.checked = true;
    }
    
    selectedTheme = currentTheme;
    themeModal.classList.add('active');
  });
  
  // Закрытие модального окна
  function closeModal() {
    themeModal.classList.remove('active');
  }
  
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  
  // Закрытие по клику вне модального окна
  themeModal.addEventListener('click', function(e) {
    if (e.target === themeModal) {
      closeModal();
    }
  });
  
  // Закрытие по клавише Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && themeModal.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Отслеживание выбора темы
  themeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      selectedTheme = this.value;
    });
  });
  
  // Сохранение темы
  saveBtn.addEventListener('click', function() {
    // Применяем выбранную тему
    if (selectedTheme === 'default') {
      root.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    } else {
      root.setAttribute('data-theme', selectedTheme);
      localStorage.setItem('theme', selectedTheme);
    }
    
    closeModal();
  });
});