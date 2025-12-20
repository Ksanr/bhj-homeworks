const dead = document.getElementById('dead');
const lost = document.getElementById('lost');

const getHole = index => document.getElementById(`hole${index}`);

for (let i = 1; i < 10; i++) {
    const hole = getHole(i);
    hole.onclick = function() {
        if (hole.classList.contains( 'hole_has-mole' )) {
            dead.textContent = Number(dead.textContent) + 1;
        } else {
            lost.textContent = Number(lost.textContent) + 1;
        }

        if (dead.textContent === '10') {
            alert('Вы победили!');
            dead.textContent = '0';
            lost.textContent = '0';
        }

        if (lost.textContent === '5') {
            alert('Вы проиграли!');
            dead.textContent = '0';
            lost.textContent = '0';
        }
    }
}