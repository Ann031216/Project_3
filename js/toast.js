'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const subscribeForm = document.querySelector(".subscribe__form");
  const emailInput = document.querySelector(".subscribe__input");
  const toast = document.getElementById("subscribe-toast");

  subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailValue = emailInput.value.trim();

    if (emailValue) {
      // Відображаємо toast
      toast.textContent = `Дякуємо за підписку, ${emailValue}!`;
      toast.classList.add("show");

      // Ховаємо через 3 секунди
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);

      // Очищаємо поле
      emailInput.value = "";
    }
  });
});
