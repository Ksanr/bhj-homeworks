document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const fileInput = document.getElementById('file');
    const progressBar = document.getElementById('progress');
    const fileNameSpan = document.querySelector('.input__wrapper-desc');

    // Обновляем имя файла при выборе
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            const fileName = this.files[0].name;
            fileNameSpan.textContent = fileName;
            fileNameSpan.style.color = '#000';
        } else {
            resetFileName();
        }
    });

    // Обработка отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        // Проверяем, выбран ли файл
        if (fileInput.files.length === 0) {
            alert('Пожалуйста, выберите файл для загрузки');
            return;
        }

        // Получаем файл
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        // Создаем XMLHttpRequest для отслеживания прогресса
        const xhr = new XMLHttpRequest();

        // Настраиваем обработчик события прогресса загрузки
        xhr.upload.addEventListener('progress', function(event) {
            if (event.lengthComputable) {
                // Вычисляем прогресс от 0 до 1
                const progress = event.loaded / event.total;
                progressBar.value = progress;
            }
        });

        // Настраиваем обработчик завершения загрузки
        xhr.addEventListener('load', function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                alert('Файл успешно загружен!');
                progressBar.value = 1.0;

                // Сбрасываем имя файла
                resetFileName();

                // Сбрасываем форму
                form.reset();

                // Через секунду сбрасываем прогресс
                setTimeout(() => {
                    progressBar.value = 0.0;
                }, 1000);
            } else {
                handleError(xhr.status, xhr.statusText);
            }
        });

        // Настраиваем обработчик ошибки
        xhr.addEventListener('error', function() {
            handleError(0, 'Ошибка сети или сервер недоступен');
        });

        // Настраиваем обработчик прерывания загрузки
        xhr.addEventListener('abort', function() {
            alert('Загрузка файла была прервана');
        });

        // Открываем соединение и отправляем данные
        xhr.open('POST', form.action);
        xhr.send(formData);
    });

    // Функция сброса имени файла
    function resetFileName() {
        fileNameSpan.textContent = 'Имя файла...';
        fileNameSpan.style.color = '';
    }

    // Функция обработки ошибок
    function handleError(status, message) {
        progressBar.value = 0.0;

        let errorMessage = 'Произошла ошибка при загрузке файла. ';

        if (status === 0) {
            errorMessage += 'Проверьте подключение к интернету.';
        } else if (status === 413) {
            errorMessage += 'Файл слишком большой.';
        } else if (status === 415) {
            errorMessage += 'Неподдерживаемый тип файла.';
        } else if (status >= 500) {
            errorMessage += 'Ошибка сервера. Попробуйте позже.';
        } else {
            errorMessage += `Код ошибки: ${status}. ${message}`;
        }

        alert(errorMessage);
    }
});