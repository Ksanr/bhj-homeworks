// task.js

document.addEventListener('DOMContentLoaded', function() {
    const itemsContainer = document.getElementById('items');
    const loader = document.getElementById('loader');
    const cacheKey = 'currencyData';
    const cacheTimestampKey = 'currencyTimestamp';
    const cacheExpiryTime = 10 * 60 * 1000; // 10 минут в миллисекундах

    // Функция для отображения данных о валютах
    function renderCurrencies(data) {
        // Очищаем контейнер
        itemsContainer.innerHTML = '';

        // Перебираем все валюты и создаем элементы
        for (const currencyCode in data) {
            const currency = data[currencyCode];

            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';

            const codeDiv = document.createElement('div');
            codeDiv.className = 'item__code';
            codeDiv.textContent = currency.CharCode;

            const valueDiv = document.createElement('div');
            valueDiv.className = 'item__value';
            valueDiv.textContent = currency.Value.toFixed(4);

            const currencyDiv = document.createElement('div');
            currencyDiv.className = 'item__currency';
            currencyDiv.textContent = 'руб.';

            itemDiv.appendChild(codeDiv);
            itemDiv.appendChild(valueDiv);
            itemDiv.appendChild(currencyDiv);

            itemsContainer.appendChild(itemDiv);
        }
    }

    // Функция для сохранения данных в кэш
    function saveToCache(data) {
        const cacheData = {
            data: data,
            timestamp: new Date().getTime()
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    }

    // Функция для получения данных из кэша
    function getFromCache() {
        const cached = localStorage.getItem(cacheKey);
        if (!cached) return null;

        const cacheData = JSON.parse(cached);
        const currentTime = new Date().getTime();

        // Проверяем, не устарели ли данные
        if (currentTime - cacheData.timestamp < cacheExpiryTime) {
            return cacheData.data;
        } else {
            // Данные устарели, удаляем их из кэша
            localStorage.removeItem(cacheKey);
            return null;
        }
    }

    // Функция для загрузки данных о валютах
    function loadCurrencies() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');

        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    const valuteData = response.response.Valute;

                    // Сохраняем данные в кэш
                    saveToCache(valuteData);

                    // Отображаем данные
                    renderCurrencies(valuteData);
                } catch (error) {
                    console.error('Ошибка при обработке данных:', error);
                    showError('Ошибка обработки данных');
                }
            } else {
                console.error('Ошибка при загрузке данных:', xhr.status);
                showError('Ошибка загрузки данных');
            }

            // Скрываем анимацию загрузки
            loader.classList.remove('loader_active');
        };

        xhr.onerror = function() {
            console.error('Ошибка сети');
            showError('Ошибка сети');
            loader.classList.remove('loader_active');
        };

        xhr.ontimeout = function() {
            console.error('Таймаут запроса');
            showError('Таймаут запроса');
            loader.classList.remove('loader_active');
        };

        // Отправляем запрос
        xhr.send();
    }

    // Функция для отображения ошибки
    function showError(message) {
        itemsContainer.innerHTML = `<div class="error">${message}</div>`;
    }

    // Основная логика
    function init() {
        // Проверяем кэш
        const cachedData = getFromCache();

        if (cachedData) {
            // Если есть кэшированные данные, отображаем их
            renderCurrencies(cachedData);

            // Скрываем анимацию загрузки
            loader.classList.remove('loader_active');

            // Загружаем актуальные данные в фоне
            loadCurrencies();
        } else {
            // Если кэша нет, загружаем данные с показом анимации
            loadCurrencies();
        }
    }

    // Запускаем приложение
    init();
});