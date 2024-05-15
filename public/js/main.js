// srcipt register/login box
const login_display = document.querySelector('.modal');
const btn__login = document.querySelector('.btn-login');
const modal_container = document.querySelector('.modal__body');
// console.log(modal_container)
// console.log(btn__login);
btn__login.addEventListener('click', function () {
  login_display.classList.add('open__btn');
});
login_display.addEventListener('click', function () {
  login_display.classList.remove('open__btn');
});
modal_container.addEventListener('click', function (event) {
  event.stopPropagation();
});

function bookNow() {
  window.location.href = '/room'
}