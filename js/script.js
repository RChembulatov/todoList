let tasks = [{
    id: 0,
    name: "Задача номер один",
    date: "1 января 2020",
    done: false,
    deleted: false,
    description: `Первое описание`
  },
  {
    id: 1,
    name: "Задача номер два",
    date: "2 февраля 2020",
    done: true,
    deleted: false,
    description: `Второе описание`
  },
  {
    id: 2,
    name: "Задача номер три",
    date: "3 марта 2020",
    done: true,
    deleted: false,
    description: `Третье описание`
  },
  {
    id: 3,
    name: "Задача номер четыре",
    date: "4 марта 2020",
    done: true,
    deleted: false,
    description: `Четвертое описание`
  }
];

const todosWindow = document.querySelector(".todos");
const itemsListParent = document.querySelector(".todo__items");
const aside = document.querySelector(".todo__aside");
const todoAsideClose = document.querySelector(".todo__aside--close");
const btnTodoItem = document.querySelector("#button");
const modalAddTask = document.querySelector(".modal__add--task");
const modalWindow = document.querySelector(".modal__window");
const modalWindowClose = document.querySelector(".modal__window--close");
const btnWindow = document.querySelector("#btnWindow");

//Сбор задач и вывод их в верстке
function renderTasks(elem, list) {
  let tasksHtml = "";
  elem.innerHTML = ""; // Обнуление содержимого дива

  for (task of list) {
    tasksHtml += `
      <div class="todo__item ${task.done ? "doneClass" : ""}">
        <span class="todo__item--id">${task.id}</span>
        <span class="todo__item--name">${task.name}</span>
        <span class="todo__item--date">${task.date}</span>
        <input class="todo__item--check" type="checkbox" ${
          task.done ? "checked" : ""
        } />
        <button class="del">УДАЛИТЬ</button>
      </div>`;
  }
  elem.innerHTML = tasksHtml;
  return elem.innerHTML;
}

// Описание задачи
function showDescription(task) {
  aside.style.display = "block";
  aside.querySelector(".todo__aside__name").innerText = task.name;
  aside.querySelector(".todo__aside__date--number").innerText = task.date;
  aside.querySelector(".todo__aside__description").innerText = task.description;
}

//Функция проверки каждого поля и подсветка пустых полей
function checkValue(field) {
  if (field.value == "") {
    field.classList.add("empty");
    return false;
  } else {
    field.classList.remove("empty");
    return true;
  }
}


//Функция добавления новой задачи
btnWindow.addEventListener("click", () => {
  let taskName = document.getElementsByName("taskName")[0],
    taskDate = document.getElementsByName("taskDate")[0],
    taskDescription = document.getElementsByName("taskDescription")[0];


  if (
    checkValue(taskName) &&
    checkValue(taskDate) &&
    checkValue(taskDescription)
  ) {
    
    const date = new Date(taskDate.value).toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let newTask = {
      id: tasks.length,
      name: taskName.value,
      date: date,
      description: taskDescription.value,
      done: false
    }; // Создаем объект задачи

    
    console.log(date);
    tasks.push(newTask); // Заталкиваем в конец массива объект задачи
    renderTasks(itemsListParent, tasks); // Рисуем задачу
    closeModal(modalAddTask); //Закрываем окно
    taskName.value = ""; // Очищаем поля от прежних введенных данных
    taskDate.value = "";
    taskDescription.value = "";
  }
});

// Добавление задач в aside
itemsListParent.addEventListener("click", event => {
  const targetEl = event.target.parentElement; //Родитель элемента, на котором произошло событие
  if (targetEl) {
    //Проверка, что точно сужествует тот элемент, на который кликнули
    let targetTask = parseInt(
      targetEl.querySelector(".todo__item--id").innerText
    ); //ID задачи по которой произошел клик
    //Выборочная кликабельность элементов для вызова aside
    if (
      !event.target.classList.contains("todo__item--check") &&
      !event.target.classList.contains("del")
    ) {
      showDescription(tasks[targetTask]);
    }
    if (event.target.classList.contains("todo__item--check")) {
      targetEl.classList.toggle("doneClass");
    }

    if (event.target.classList.contains("del")) {
      tasks[targetTask].deleted = !tasks[targetTask].deleted;
      targetEl.style.display = "none";
    }
  }
});

//Функция закрытия окна
function closeModal(el) {
  el.style.display = "none";
}

//Функция показа или закрытия модального окна
function toggleModal(element, item, display) {
  element.addEventListener("click", () => {
    item.style.display = display;
  });
}
//Закрытие модального окна добавления задачи при клике на любое место страницы
modalAddTask.addEventListener("click", e => {
  if (!modalWindow.contains(e.target) && !itemsListParent.contains(e.target)) {
    // Если модальное окно не содержит элемента, на который мы кликнули
    closeModal(modalAddTask);
  }
});

//Закрытие модального окна aside при клике на любое место страницы
todosWindow.addEventListener("click", e => {
  if (!aside.contains(e.target) && !itemsListParent.contains(e.target)) {
    // Если модальное окно не содержит элемента, на который мы кликнули
    closeModal(aside);
  }
});

renderTasks(itemsListParent, tasks);
toggleModal(todoAsideClose, aside, "none");
toggleModal(todoAsideClose, aside, "none");
toggleModal(modalWindowClose, modalAddTask, "none");
toggleModal(btnTodoItem, modalAddTask, "block");