const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const dropdownList = document.querySelector(".dropdown__list");
  const dropdownValue = document.querySelector(".dropdown__value");

  dropdownValue.addEventListener('click', (event) => {
    event.stopPropagation();
    dropdowns.forEach(otherDropdown => {
      if (otherDropdown !== dropdown) {
        const otherList = otherDropdown.querySelector('.dropdown__list');
        otherList.classList.remove('dropdown__list_active');
      }
    });
    dropdownList.classList.toggle('dropdown__list_active');
  });

  dropdownList.addEventListener('click', (event) => {
    if (event.target.classList.contains('dropdown__link')) {
      event.preventDefault();
      dropdownValue.textContent = event.target.textContent;
      dropdownList.classList.remove('dropdown__list_active');
    }
  });
});

document.addEventListener('click', () => {
  dropdowns.forEach(dropdown => {
    const dropdownList = dropdown.querySelector('.dropdown__list');
    dropdownList.classList.remove('dropdown__list_active');
  });
});