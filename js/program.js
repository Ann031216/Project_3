'use strict';

/*document.addEventListener('DOMContentLoaded', async () => {
  const form = document.querySelector('.upper__form');
  const results = document.getElementById('programResults');
  const hiddenSelect = document.getElementById('location');
  const customSelect = document.querySelector('.custom-select');
  const selectedDisplay = customSelect.querySelector('.custom-select__selected');
  const optionsContainer = customSelect.querySelector('.custom-select__options');
  let tours = [];

  // =============================
  // 1. ЗАВАНТАЖЕННЯ ДАНИХ ІЗ JSON
  // =============================
  try {
    const response = await fetch('./data/tours.json');
    const data = await response.json();
    tours = data.tours;
    console.log('✅ Дані з JSON:', tours);
  } catch (err) {
    console.error('❌ Не вдалося завантажити JSON:', err);
    results.innerHTML = '<p>Помилка при завантаженні локального файлу.</p>';
    return;
  }

  // =============================
  // 2. КАСТОМНИЙ SELECT
  // =============================
  selectedDisplay.addEventListener('click', () => {
    customSelect.classList.toggle('open');
  });

  optionsContainer.addEventListener('click', (e) => {
    const option = e.target.closest('li');
    if (!option) return;

    const value = option.dataset.value;
    const text = option.textContent;

    hiddenSelect.value = value;
    selectedDisplay.textContent = text;
    customSelect.classList.remove('open');

    console.log(`📍 Вибрано: ${text} (${value})`);
  });

  document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) customSelect.classList.remove('open');
  });

  // =============================
  // 3. ОБРОБКА ПОДАННЯ ФОРМИ
  // =============================
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = hiddenSelect.value.trim();
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const participants = document.getElementById('participants').value;

    if (!location) {
      alert('Будь ласка, виберіть локацію 🌍');
      return;
    }

    console.log('📌 Пошук за:', { location, startDate, endDate, participants });

    const filtered = tours.filter(tour => tour.country === location);

    if (filtered.length > 0) {
      results.classList.remove('hidden');
      results.innerHTML = filtered.map(item => `
        <div class="tour-card">
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p><strong>Країна:</strong> ${item.country}</p>
          <p><strong>Адреса:</strong> ${item.address}</p>
          <p><strong>Рейтинг:</strong> ${item.rating}</p>
          <p><strong>Осіб:</strong> ${participants || 1}</p>
          <p><strong>Дати:</strong> ${startDate || '—'} – ${endDate || '—'}</p>
        </div>
      `).join('');
    } else {
      results.classList.remove('hidden');
      results.innerHTML = '<p>Нічого не знайдено 😔</p>';
    }
  });
});*/

/*document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".upper__form");
  const results = document.getElementById("programResults");
  const customSelect = document.querySelector(".custom-select");
  const selected = customSelect.querySelector(".custom-select__selected");
  const optionsContainer = customSelect.querySelector(".custom-select__options");
  const options = optionsContainer.querySelectorAll("li");
  const realSelect = document.getElementById("location");

  if (!form || !results || !customSelect || !selected || !optionsContainer || !realSelect) {
    console.error("Не знайдено потрібні елементи форми");
    return;
  }

  // ==============================
  // Custom select — відкриття/вибір
  // ==============================
  selected.addEventListener("click", (e) => {
    e.stopPropagation();
    customSelect.classList.toggle("open");
  });

  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      const value = option.dataset.value;
      const text = option.textContent.trim();

      // Оновлюємо вибране значення
      selected.textContent = text;
      selected.dataset.value = value;
      realSelect.value = value;

      customSelect.classList.remove("open");

      console.log("✅ Обрано локацію:", value);
    });
  });

  // Закрити при кліку поза select
  document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove("open");
    }
  });

  // ==============================
  // Завантаження tours.json
  // ==============================
  let tours = [];
  fetch("./data/tours.json")
    .then((r) => {
      if (!r.ok) throw new Error("status " + r.status);
      return r.json();
    })
    .then((json) => {
      tours = Array.isArray(json) ? json : json.tours || [];
      console.log("✅ tours loaded:", tours.length);
    })
    .catch((err) => {
      console.warn("⚠️ Не вдалося завантажити tours.json:", err);
    });

  // ==============================
  // Submit форми
  // ==============================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const destination = selected.dataset.value || realSelect.value || "";
    const startDate = document.getElementById("start-date")?.value || "";
    const endDate = document.getElementById("end-date")?.value || "";
    const people = document.getElementById("participants")?.value || "1";

    if (!destination) {
      alert("Будь ласка, виберіть локацію.");
      return;
    }

    results.classList.remove("hidden");
    results.innerHTML = "<p>Завантаження...</p>";

    const render = () => {
      const filtered = tours.filter(
        (t) => String(t.country).toLowerCase() === destination.toLowerCase()
      );

      if (filtered.length === 0) {
        results.innerHTML = "<p>Нічого не знайдено 😔</p>";
        return;
      }

      results.innerHTML = filtered
        .map(
          (item) => `
        <div class="tour-card">
          <img src="${
            item.image || "https://via.placeholder.com/400x250"
          }" alt="${item.name || ""}">
          <h3>${item.name || "Без назви"}</h3>
          <p><strong>Країна:</strong> ${item.country}</p>
          <p><strong>Адреса:</strong> ${item.address || ""}</p>
          <p><strong>Рейтинг:</strong> ${item.rating || "—"}</p>
          <p><strong>Осіб:</strong> ${people}</p>
          <p><strong>Дати:</strong> ${startDate || "—"} – ${endDate || "—"}</p>
        </div>
      `
        )
        .join("");
    };

    if (tours.length === 0) {
      setTimeout(() => {
        if (tours.length === 0) {
          results.innerHTML =
            "<p>Дані ще не завантажені. Спробуйте ще раз.</p>";
        } else render();
      }, 500);
    } else {
      render();
    }
  });
});
*/



document.addEventListener('DOMContentLoaded', async () => {
  const results = document.getElementById('programResults');

  try {
    const response = await fetch('./data/tours.json');
    const data = await response.json();
    console.log('✅ Дані з JSON:', data);

    results.innerHTML = data.tours.map(item => `
      <div class="tour-card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.country}</p>
        <p>Рейтинг: ${item.rating}</p>
        <p>${item.address}</p>
      </div>
    `).join('');

  } catch (err) {
    console.error('❌ Не вдалося завантажити JSON:', err);
    results.innerHTML = '<p>Помилка при завантаженні локального файлу.</p>';
  }
});
