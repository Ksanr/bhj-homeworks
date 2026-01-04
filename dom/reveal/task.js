const reveals = document.querySelectorAll('.reveal')

function isVisible(el) {
    const {top, bottom} = el.getBoundingClientRect();
    return (
        top < window.innerHeight &&
        bottom >= 0
    );
}

window.addEventListener('scroll', () => {
    for (const item of reveals) {

        if (isVisible(item)) {
            item.classList.add('reveal_active');
        } else {
            item.classList.remove('reveal_active');
        }
    }
})

