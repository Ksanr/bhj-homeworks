const dropdown = document.querySelector(".dropdown__list");
const dropdownValue = document.querySelector(".dropdown__value");

//function toggleDropdown() {
//  dropdown.classList.toggle('dropdown__list_active');
//}

function selectLink(event) {
  if (event.target.classList.contains('dropdown__link')) {
    event.preventDefault();
    dropdownValue.textContent = event.target.textContent;
  }
  dropdown.classList.toggle('dropdown__list_active');
}

//dropdownValue.addEventListener('click', toggleDropdown);

dropdownValue.addEventListener('click', selectLink);
dropdown.addEventListener('click', selectLink);
