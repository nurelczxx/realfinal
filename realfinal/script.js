

// ==========================================
// 1. ПЕРЕКЛЮЧЕНИЕ СВЕТЛОЙ И ТЁМНОЙ ТЕМЫ
// ==========================================

const themeBtn = document.getElementById("themeBtn");

// Загружаем сохранённую тему
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
} else {
    document.body.classList.remove("light");
}

// Обновляем иконку кнопки
function updateThemeIcon() {
    const isLight = document.body.classList.contains("light");

    if (themeBtn) {
        themeBtn.textContent = isLight ? "☾" : "☀";
        themeBtn.setAttribute(
            "aria-label",
            isLight ? "Включить тёмную тему" : "Включить светлую тему"
        );
    }
}

updateThemeIcon();

// Обработчик переключения темы
if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("light");

        const isLight = document.body.classList.contains("light");

        localStorage.setItem("theme", isLight ? "light" : "dark");

        updateThemeIcon();
    });
}


// ==========================================
// 2. МОБИЛЬНОЕ МЕНЮ
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const navigation = document.getElementById("navigation");

if (menuBtn && navigation) {

    // Открытие и закрытие меню
    menuBtn.addEventListener("click", function () {
        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuBtn.textContent = isOpen ? "✕" : "☰";
        menuBtn.setAttribute("aria-expanded", isOpen);
    });

    // Закрываем меню после нажатия на ссылку
    const navLinks = navigation.querySelectorAll("a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navigation.classList.remove("open");
            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });

    // Закрываем меню клавишей Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            navigation.classList.remove("open");
            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
        }
    });
}


// ==========================================
// 3. ФИЛЬТРАЦИЯ ПРОЕКТОВ
// ==========================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Получаем выбранную категорию
        const category = button.dataset.filter;

        // Убираем активный класс у всех кнопок
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Добавляем активный класс выбранной кнопке
        button.classList.add("active");

        // Показываем подходящие проекты
        projects.forEach(function (project) {

            const projectCategory = project.dataset.category;

            if (
                category === "all" ||
                category === projectCategory
            ) {
                project.classList.remove("hidden");
            } else {
                project.classList.add("hidden");
            }

        });

    });

});


// ==========================================
// 4. ПРОВЕРКА КОНТАКТНОЙ ФОРМЫ
// ==========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        // Отменяем стандартную отправку формы
        event.preventDefault();

        // Получаем значения полей
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        const formStatus = document.getElementById("formStatus");

        // Проверяем, что элементы существуют
        if (!name || !email || !message || !formStatus) {
            return;
        }

        // Получаем текст
        const nameValue = name.value.trim();
        const emailValue = email.value.trim();
        const messageValue = message.value.trim();

        // Удаляем старые ошибки
        document.querySelectorAll(".error").forEach(function (error) {
            error.textContent = "";
        });

        formStatus.textContent = "";

        let isValid = true;

        // Проверка имени
        if (nameValue.length < 2) {
            document.getElementById("nameError").textContent =
                "Введите имя (минимум 2 символа)";

            isValid = false;
        }

        // Проверка email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {
            document.getElementById("emailError").textContent =
                "Введите корректный email";

            isValid = false;
        }

        // Проверка сообщения
        if (messageValue.length < 10) {
            document.getElementById("messageError").textContent =
                "Сообщение должно содержать минимум 10 символов";

            isValid = false;
        }

        // Если есть ошибки, останавливаем функцию
        if (!isValid) {
            formStatus.style.color = "#ff7777";
            formStatus.textContent = "Проверьте правильность заполнения формы.";
            return;
        }

        // Успешное заполнение
        formStatus.style.color = "#83d7a7";

        formStatus.textContent =
            "✓ Спасибо, " + nameValue + "! Форма успешно заполнена.";

        // Очищаем форму
        contactForm.reset();

    });

}


// ==========================================
// 5. МОДАЛЬНОЕ ОКНО ПРОЕКТОВ
// ==========================================

const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");

const detailsButtons = document.querySelectorAll(".details-btn");

// Открытие модального окна
detailsButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const project = button.closest(".project");

        if (!project || !projectModal) {
            return;
        }

        const title = project.querySelector("h3");
        const description = project.querySelector("p");

        if (modalTitle && title) {
            modalTitle.textContent = title.textContent;
        }

        if (modalDescription && description) {
            modalDescription.textContent = description.textContent;
        }

        projectModal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});


// Закрытие модального окна
function closeModal() {

    if (projectModal) {
        projectModal.classList.remove("show");
    }

    document.body.style.overflow = "";

}

if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

// Закрытие нажатием за пределами окна
if (projectModal) {

    projectModal.addEventListener("click", function (event) {

        if (event.target === projectModal) {
            closeModal();
        }

    });

}

// Закрытие клавишей Escape
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeModal();
    }

});


// ==========================================
// 6. АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧЕК
// ==========================================

const animatedCards = document.querySelectorAll(".card");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    animatedCards.forEach(function (card) {
        observer.observe(card);
    });

}


// ==========================================
// 7. КНОПКА ПРОКРУТКИ НАВЕРХ
// ==========================================

const topButtons = document.querySelectorAll(
    'a[href="#top"], a[href="#home"]'
);

topButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


// ==========================================
// 8. СООБЩЕНИЕ В КОНСОЛИ
// ==========================================

console.log("Nurel Portfolio успешно загружен!");
console.log("Все JavaScript функции готовы к работе.")