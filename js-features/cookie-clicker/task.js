const clicker__counter = document.getElementById('clicker__counter');
const cookie = document.getElementById('cookie');

/* теги для повышенного уровня сложности */

const clicker__speed = document.getElementById('clicker__speed');
let now = new Date();
let oldClickTime = now;
let timeDifference = 0;
let speed = 0.00;

/* Основное задание */
cookie.onclick = () => {
    clicker__counter.textContent = Number(clicker__counter.textContent) + 1;
    if (Number(clicker__counter.textContent) % 2) {
        cookie.width += 20;
//-рассчитывается автоматом        cookie.height += 20;
    } else {
        cookie.width -= 20;
//-рассчитывается автоматом        cookie.height -= 20;
    }
    /* Повышенный уровень сложности */
    now = new Date();
    timeDifference = now - oldClickTime;
    speed = 1000 / timeDifference;
    clicker__speed.textContent = speed.toFixed(2);
    oldClickTime = now;
}