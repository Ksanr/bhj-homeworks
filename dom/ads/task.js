// Инициализации всех ротаторов
function initRotators() {
    const rotators = document.querySelectorAll('.rotator');

    rotators.forEach((rotator) => {
        const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
        
        // Запуск бесконечного цикла смены для каждого ротатора
        const changeCase = () => {
            // 1. Находим текущий активный элемент
            const activeCase = rotator.querySelector('.rotator__case_active');
            
            // 2. Определяем индекс следующего элемента
            let currentIndex = cases.indexOf(activeCase);
            let nextIndex = (currentIndex + 1) % cases.length;
            const nextCase = cases[nextIndex];

            // 3. Убираем активный класс у старого и добавляем новому
            activeCase.classList.remove('rotator__case_active');
            nextCase.classList.add('rotator__case_active');

            // 4. Применяем настройки из data-атрибутов (цвет и скорость)
            const color = nextCase.dataset.color;
            const speed = nextCase.dataset.speed || 1000; // По умолчанию 1сек

            if (color) {
                nextCase.style.color = color;
            }

            // 5. Рекурсивный вызов: ставим следующий таймер с новой скоростью
            setTimeout(changeCase, speed);
        };

        // Устанавливаем цвет для первого (активного по умолчанию) элемента при загрузке
        const initialCase = rotator.querySelector('.rotator__case_active');
        if (initialCase) {
            initialCase.style.color = initialCase.dataset.color;
            // Запускаем цикл смены через интервал, указанный в первом элементе
            setTimeout(changeCase, initialCase.dataset.speed || 1000);
        }
    });
}

// Запускаем скрипт после загрузки DOM
document.addEventListener('DOMContentLoaded', initRotators);