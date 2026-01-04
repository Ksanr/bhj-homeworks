const book = document.getElementById('book');

// Универсальная функция для смены активного класса в группе кнопок
function updateActiveControl(event, activeClass) {
    event.preventDefault(); // Отключаем переход по ссылке
    const group = event.target.closest('.book__control');
    group.querySelector(`.${activeClass}`).classList.remove(activeClass);
    event.target.classList.add(activeClass);
}

// 1. Управление размером шрифта
const fontSizeControls = document.querySelectorAll('.font-size');
fontSizeControls.forEach(control => {
    control.addEventListener('click', (event) => {
        updateActiveControl(event, 'font-size_active');

        const size = event.target.dataset.size;

        // Удаляем старые классы размера
        book.classList.remove('book_fs-small', 'book_fs-big');

        // Добавляем новый класс, если он есть (для обычной буквы A data-size нет)
        if (size) {
            book.classList.add(`book_fs-${size}`);
        }
    });
});

// 2. Управление цветом текста (Повышенный уровень)
const textColorControls = document.querySelectorAll('.book__control_color .color');
textColorControls.forEach(control => {
    control.addEventListener('click', (event) => {
        updateActiveControl(event, 'color_active');

        const color = event.target.dataset.textColor;

        // Убираем все возможные классы цвета текста
        book.classList.remove('book_color-black', 'book_color-gray', 'book_color-whitesmoke');

        // Добавляем нужный
        book.classList.add(`book_color-${color}`);
    });
});

// 3. Управление цветом фона (Повышенный уровень)
const bgColorControls = document.querySelectorAll('.book__control_background .color');
bgColorControls.forEach(control => {
    control.addEventListener('click', (event) => {
        updateActiveControl(event, 'color_active');

        const bgColor = event.target.dataset.bgColor;

        // Убираем старые классы фона
        book.classList.remove('book_bg-black', 'book_bg-gray', 'book_bg-white');

        // Добавляем новый
        book.classList.add(`book_bg-${bgColor}`);
    });
});