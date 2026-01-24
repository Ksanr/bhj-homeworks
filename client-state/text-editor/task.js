document.addEventListener('DOMContentLoaded', function() {
    const editor = document.getElementById('editor');
    const STORAGE_KEY = 'textEditorContent';

    // Восстанавливаем текст
    const savedText = localStorage.getItem(STORAGE_KEY);
    if (savedText) {
        editor.value = savedText;
    }

    // Сохраняем изменения
    editor.addEventListener('input', function() {
        localStorage.setItem(STORAGE_KEY, editor.value);
    });

    // Динамически создаем кнопку
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Очистить содержимое';
    clearButton.style.cssText = `
        display: block;
        padding: 10px 20px;
        background-color: #f44336;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-family: Golos, Arial, sans-serif;
        font-size: 16px;
        margin-top: 10px;
    `;

    // Добавляем кнопку после textarea
    editor.parentNode.appendChild(clearButton);

    // Обработчик для кнопки
    clearButton.addEventListener('click', function() {
        editor.value = '';
        localStorage.removeItem(STORAGE_KEY);
        editor.focus();
    });
});