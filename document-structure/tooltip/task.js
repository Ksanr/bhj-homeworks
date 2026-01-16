document.addEventListener('DOMContentLoaded', function() {
    // Создаем контейнер для подсказки
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);

    let currentTooltip = null;

    // Функция для позиционирования подсказки
    function calculatePosition(element, tooltipElement) {
        // Временно показываем подсказку для расчета размеров
        tooltipElement.style.display = 'block';
        tooltipElement.style.visibility = 'hidden';
        tooltipElement.style.opacity = '0';

        const tooltipWidth = tooltipElement.offsetWidth;
        const tooltipHeight = tooltipElement.offsetHeight;

        const rect = element.getBoundingClientRect();
        const position = element.dataset.position || 'default';

        // Получаем текущую прокрутку страницы
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        let left, top;

        switch(position) {
            case 'top':
                left = rect.left;
                top = rect.top - 30;
                break;

            case 'bottom':
                left = rect.left;
                top = rect.bottom;
                break;

            case 'left':
                left = rect.left - tooltipWidth;
                top = rect.top + (rect.height - tooltipHeight) / 2;
                break;

            case 'right':
                left = rect.right ;
                top = rect.top + (rect.height - tooltipHeight) / 2;
                break;

            default:
                left = rect.left + (rect.width - tooltipWidth) / 2;
                top = rect.top + (rect.height - tooltipHeight) / 2;
        }

        // Проверяем, чтобы подсказка не выходила за границы окна
        const windowWidth = document.documentElement.clientWidth;
        const windowHeight = document.documentElement.clientHeight;

        // Горизонтальная корректировка
        if (left < 0) {
            left = 0;
        }
        if (left + tooltipWidth > windowWidth) {
            left = windowWidth - tooltipWidth;
        }

        // Вертикальная корректировка
        if (top < 0) {
            // Если подсказка не помещается сверху, показываем снизу
            top = rect.bottom;
        }

        // Проверяем нижнюю границу
        if (top + tooltipHeight > windowHeight) {
            top = rect.top - 30;
        }

        // Сбрасываем временные стили
        tooltipElement.style.display = '';
        tooltipElement.style.visibility = '';
        tooltipElement.style.opacity = '';

        // console.log(scrollX, scrollY, windowWidth, windowHeight, rect.left, rect.top, left, top, tooltipWidth, tooltipHeight)
        return { left, top };
    }

    // Функция для показа подсказки
    function showTooltip(element) {
        // Получаем текст подсказки
        const tooltipText = element.getAttribute('title');
        tooltip.textContent = tooltipText;

        // Рассчитываем позицию
        const { left, top } = calculatePosition(element, tooltip);

        // Устанавливаем позицию и активируем подсказку
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.classList.add('tooltip_active');
    }

    // Обработчик клика по документу
    document.addEventListener('click', function(event) {
        const target = event.target;

        // Если кликнули по ссылке с подсказкой
        if (target.classList.contains('has-tooltip')) {
            event.preventDefault();

            // Если это текущая подсказка - скрываем её
            if (currentTooltip === target) {
                tooltip.classList.remove('tooltip_active');
                currentTooltip = null;
                return;
            }

            // Скрываем предыдущую подсказку
            tooltip.classList.remove('tooltip_active');

            // Запоминаем текущую ссылку
            currentTooltip = target;

            // Показываем подсказку
            showTooltip(target);

        } else {
            // Если кликнули вне подсказки - скрываем её
            if (!tooltip.contains(target)) {
                tooltip.classList.remove('tooltip_active');
                currentTooltip = null;
            }
        }
    });

    // Обновляем позицию подсказки при прокрутке, если она активна
    window.addEventListener('scroll', function() {
        if (tooltip.classList.contains('tooltip_active') && currentTooltip) {
            tooltip.classList.remove('tooltip_active');
            currentTooltip = null;
        }
    });

    // Скрываем подсказку при изменении размера окна
    window.addEventListener('resize', function() {
        if (tooltip.classList.contains('tooltip_active') && currentTooltip) {
            tooltip.classList.remove('tooltip_active');
            currentTooltip = null;
        }
    });
});