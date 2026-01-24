document.addEventListener('DOMContentLoaded', () => {
  const signinForm = document.getElementById('signin__form');
  const signinSection = document.getElementById('signin');
  const welcomeSection = document.getElementById('welcome');
  const userIdSpan = document.getElementById('user_id');
  const logoutBtnId = 'logout__btn';

  // Проверяем, сохранен ли user_id в localStorage
  const storedUserId = localStorage.getItem('user_id');
  if (storedUserId) {
    showWelcome(storedUserId);
  }

  // Обработка отправки формы
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(signinForm);
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
    xhr.responseType = 'json';

    xhr.onload = function() {
      if (xhr.status === 201 && xhr.response.success) {
        const userId = xhr.response.user_id;
        localStorage.setItem('user_id', userId);
        showWelcome(userId);
      } else {
        alert('Неверный логин/пароль');
      }
      signinForm.reset(); // Очищаем поля формы
    };

    xhr.onerror = function() {
      alert('Ошибка соединения с сервером');
      signinForm.reset();
    };

    xhr.send(formData);
  });

  // Функция показа блока приветствия
  function showWelcome(userId) {
    userIdSpan.textContent = userId;
    signinSection.classList.remove('signin_active');
    welcomeSection.classList.add('welcome_active');

    // Добавляем кнопку выхода, если её ещё нет
    if (!document.getElementById(logoutBtnId)) {
      const logoutBtn = document.createElement('button');
      logoutBtn.id = logoutBtnId;
      logoutBtn.className = 'btn';
      logoutBtn.textContent = 'Выйти';
      logoutBtn.style.marginLeft = '20px';
      welcomeSection.appendChild(logoutBtn);

      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user_id');
        welcomeSection.classList.remove('welcome_active');
        signinSection.classList.add('signin_active');
        welcomeSection.removeChild(logoutBtn);
      });
    }
  }
});