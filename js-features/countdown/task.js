const timer = document.getElementById('timer');
/* Основное задание */
/*
setInterval(() => {
    if (Number(timer.textContent) > 0) {
        timer.textContent = Number(timer.textContent) - 1;
    } else {
        alert('Вы победили в конкурсе!');
        timer.textContent = 60;
    }
}, 1000)
*/

/* Сложность 1 */
let s = 5000;

function toHHMMSS(secs) {
    const pad = val => ('0' + val).slice(-2);
    return [Math.floor(secs / 3600), Math.floor((secs % 3600) / 60), secs % 60]
        .map(pad)
        .join(':');
}

console.log(toHHMMSS(s));

setInterval(() => {
    if (s > 0) {
        s--;
    } else {
        alert('Вы победили в конкурсе! Загружаем приз');
        /* Сложность 2 */
        location = 'https://www.rustore.ru/download';
        s = 5000;
    }
    timer.textContent = toHHMMSS(s);
}, 1000)