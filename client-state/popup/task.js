document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('subscribe-modal');
  const closeButton = modal.querySelector('.modal__close');

  // Проверяем, есть ли информация о закрытии окна в cookie
  if (!document.cookie.includes('modalClosed=true')) {
    modal.classList.add('modal_active');
  }

  // Обработчик клика по крестику
  closeButton.addEventListener('click', function() {
    modal.classList.remove('modal_active');

    // Устанавливаем cookie с информацией о закрытии окна
    // Устанавливаем срок действия на 1 год
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    document.cookie = `modalClosed=true; expires=${expirationDate.toUTCString()}; path=/`;
  });
});