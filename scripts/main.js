window.addEventListener('load', () => {
  console.log("Hello, JS!");

  getHeaderHeight('#js-header');

  handleSubmit({
    formSelector: '#js-form',
    successBlockSelector: '#js-success-block',
    showAgainBtnSelector: '#js-success-btn'},{
    showSuccessBlockClass: 'form__success_visible',
    hideFormClass: 'form_hidden'
  });

  initTopBtn("#js-top-btn");
})

/**
 * Создаёт CSS-переменную "--header-height", которая хранит высоту шапки
 * @param {String} headerSelector - CSS-селектор header'а
 */
function getHeaderHeight(headerSelector) {
  const header = document.querySelector(headerSelector);

  if (!header)
    return console.warn(`Element with selector "${headerSelector}" is not defined (getHeaderHeight)`);

  document.documentElement.style.setProperty('--header-height', `${header.clientHeight}px`);
}

/**
 * Обработчик сабмита формы
 */
function handleSubmit({formSelector, successBlockSelector, showAgainBtnSelector}, {showSuccessBlockClass, hideFormClass}) {
  const form = document.querySelector(formSelector);
  if (!form)
    return console.warn(`Form with selector "${formSelector}" is not defined (handleSubmit)`);

  const successBlock = document.querySelector(successBlockSelector);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();

    if (successBlock) {
      successBlock.classList.add(showSuccessBlockClass);
      form.classList.add(hideFormClass);

      const successBtn = successBlock.querySelector(showAgainBtnSelector);
      if (successBtn) {
        successBtn.addEventListener('click', () => {
          successBlock.classList.remove(showSuccessBlockClass);
          form.classList.remove(hideFormClass);
        })
      }
      else {
        console.warn(`Success BTN with selector "${showAgainBtnSelector}" is not defined (handleSubmit)`);
      }
    }
    else {
      console.warn(`Success block with selector "${successBlockSelector}" is not defined (handleSubmit)`);
    }
  })
}

/**
 * Включает кнопку "Наверх"
 */
function initTopBtn(topBtnSelector) {
  const topBtn = document.querySelector(topBtnSelector);
  if (!topBtn)
    return console.warn(`Top btn with selector "${topBtnSelector}" is not defined (initTopBtn)`);

  topBtn.addEventListener('click', () => {
    gsap.to(window, {duration: 0.3, scrollTo: 0});
  })
}