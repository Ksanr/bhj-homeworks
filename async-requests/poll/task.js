(function() {
  // Получаем ссылки на элементы DOM
  const pollTitleElement = document.getElementById('poll__title');
  const pollAnswersElement = document.getElementById('poll__answers');
  let pollId = null;

  // Функция для получения опроса
  function loadPoll() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          pollId = data.id;

          // Отображаем заголовок опроса
          pollTitleElement.textContent = data.data.title;

          // Очищаем предыдущие ответы
          pollAnswersElement.innerHTML = '';

          // Создаем кнопки для каждого варианта ответа
          data.data.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'poll__answer';
            button.textContent = answer;

            // Добавляем обработчик клика
            button.addEventListener('click', () => {
              // Отключаем все кнопки после выбора
              const allButtons = pollAnswersElement.querySelectorAll('.poll__answer');
              allButtons.forEach(btn => btn.disabled = true);

              // Показываем сообщение
              alert('Спасибо, ваш голос засчитан!');

              // Отправляем голос на сервер
              sendVote(index);
            });

            pollAnswersElement.appendChild(button);
          });
        } else {
          console.error('Ошибка при загрузке опроса:', xhr.status);
          pollTitleElement.textContent = 'Ошибка загрузки опроса';
        }
      }
    };

    xhr.send();
  }

  // Функция для отправки голоса
  function sendVote(answerIndex) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
      if (xhr.status === 201) { // статус 201 Created
        try {
          const results = JSON.parse(xhr.responseText);
          showResults(results.stat);
        } catch (error) {
          console.error('Ошибка при разборе ответа:', error);
          showError();
        }
      } else {
        console.error('Ошибка при отправке голоса:', xhr.status);
        showError();
      }
    };

    xhr.onerror = function() {
      console.error('Ошибка сети при отправке голоса');
      showError();
    };

    // Отправляем данные: id опроса и индекс выбранного ответа
    const data = `vote=${pollId}&answer=${answerIndex}`;
    xhr.send(data);
  }

  // Функция для отображения результатов
  function showResults(statistics) {
    // Очищаем контейнер с ответами
    pollAnswersElement.innerHTML = '';

    // Вычисляем общее количество голосов
    const totalVotes = statistics.reduce((sum, item) => sum + item.votes, 0);

    // Создаем элементы для отображения статистики
    statistics.forEach(item => {
      const resultElement = document.createElement('div');
      resultElement.className = 'poll__result';

      // Вычисляем процент
      const percentage = totalVotes > 0 ? ((item.votes / totalVotes) * 100).toFixed(2) : 0;

      // Создаем строку с результатом
      const resultRow = document.createElement('div');
      resultRow.className = 'result-row';

      const resultAnswer = document.createElement('span');
      resultAnswer.className = 'result-answer';
      resultAnswer.textContent = item.answer;

      const resultStats = document.createElement('span');
      resultStats.className = 'result-stats';

      const resultVotes = document.createElement('span');
      resultVotes.className = 'result-votes';
      resultVotes.textContent = `${item.votes} голосов`;

      const resultPercentage = document.createElement('span');
      resultPercentage.className = 'result-percentage';
      resultPercentage.textContent = `(${percentage}%)`;

      resultStats.appendChild(resultVotes);
      resultStats.appendChild(document.createTextNode(' '));
      resultStats.appendChild(resultPercentage);

      resultRow.appendChild(resultAnswer);
      resultRow.appendChild(resultStats);

      const resultBar = document.createElement('div');
      resultBar.className = 'result-bar';

      const resultBarFill = document.createElement('div');
      resultBarFill.className = 'result-bar-fill';
      resultBarFill.style.width = `${percentage}%`;

      resultBar.appendChild(resultBarFill);

      resultElement.appendChild(resultRow);
      resultElement.appendChild(resultBar);

      pollAnswersElement.appendChild(resultElement);
    });

    // Добавляем информацию об общем количестве голосов
    const totalElement = document.createElement('div');
    totalElement.className = 'poll__total';
    totalElement.textContent = `Всего голосов: ${totalVotes}`;
    pollAnswersElement.appendChild(totalElement);

    // Добавляем кнопку для нового опроса
    const againButton = document.createElement('button');
    againButton.className = 'poll__again';
    againButton.textContent = 'Пройти другой опрос';
    againButton.addEventListener('click', () => {
      location.reload(); // перезагрузить опрос
    });
    pollAnswersElement.appendChild(againButton);
  }

  // Функция для отображения ошибки
  function showError() {
    pollAnswersElement.innerHTML = '';
    const errorElement = document.createElement('div');
    errorElement.className = 'poll__error';
    errorElement.textContent = 'Произошла ошибка при загрузке результатов. Попробуйте позже.';
    pollAnswersElement.appendChild(errorElement);

    const reloadButton = document.createElement('button');
    reloadButton.className = 'poll__again';
    reloadButton.textContent = 'Попробовать снова';
    reloadButton.addEventListener('click', () => {
      location.reload();
    });
    pollAnswersElement.appendChild(reloadButton);
  }

  // Добавляем CSS для стилизации результатов
  const style = document.createElement('style');
  style.textContent = `
    .poll__result {
      margin-bottom: 15px;
    }

    .result-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }

    .result-answer {
      font-weight: bold;
    }

    .result-stats {
      color: #666;
      font-size: 0.9em;
    }

    .result-votes {
      margin-right: 5px;
    }

    .result-bar {
      width: 100%;
      height: 20px;
      background-color: #f0f0f0;
      border-radius: 10px;
      overflow: hidden;
    }

    .result-bar-fill {
      height: 100%;
      background-color: #4CAF50;
      transition: width 0.5s ease-in-out;
    }

  `;
  document.head.appendChild(style);

  // Загружаем опрос при загрузке страницы
  loadPoll();
})();