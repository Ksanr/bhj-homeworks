document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const tasksForm = document.getElementById('tasks__form');
    const taskInput = document.getElementById('task__input');
    const tasksList = document.getElementById('tasks__list');

    // Загружаем задачи из localStorage при загрузке страницы
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Функция для сохранения задач в localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Функция для отображения всех задач
    function renderTasks() {
        tasksList.innerHTML = '';
        tasks.forEach((task, index) => {
            addTaskToDOM(task, index);
        });
    }

    // Функция для добавления задачи в DOM
    function addTaskToDOM(taskText, index) {
        // Создаем элемент задачи
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.dataset.index = index;

        // Создаем заголовок задачи
        const titleElement = document.createElement('div');
        titleElement.className = 'task__title';
        titleElement.textContent = taskText;

        // Создаем кнопку удаления
        const removeElement = document.createElement('a');
        removeElement.href = '#';
        removeElement.className = 'task__remove';
        removeElement.innerHTML = '&times;';

        // Добавляем обработчик удаления (один обработчик для каждой кнопки)
        removeElement.addEventListener('click', function(event) {
            event.preventDefault();
            removeTask(index);
        });

        // Собираем структуру
        taskElement.appendChild(titleElement);
        taskElement.appendChild(removeElement);

        // Добавляем в список
        tasksList.appendChild(taskElement);
    }

    // Функция для добавления новой задачи
    function addTask(taskText) {
        if (taskText.trim() === '') {
            return;
        }

        // Добавляем задачу в массив
        tasks.push(taskText);

        // Сохраняем в localStorage
        saveTasks();

        // Добавляем задачу в DOM
        addTaskToDOM(taskText, tasks.length - 1);

        // Очищаем поле ввода
        taskInput.value = '';
    }

    // Функция для удаления задачи
    function removeTask(index) {
        // Удаляем задачу из массива
        tasks.splice(index, 1);

        // Сохраняем изменения
        saveTasks();

        // Перерисовываем список
        renderTasks();
    }

    // Обработчик отправки формы (кнопка "Добавить")
    tasksForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(taskInput.value);
    });

    // Обработчик нажатия клавиши Enter в поле ввода
    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && taskInput.value.trim() !== '') {
            event.preventDefault();
            addTask(taskInput.value);
        }
    });

    // Отображаем задачи при загрузке страницы
    renderTasks();
});