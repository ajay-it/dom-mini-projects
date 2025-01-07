// Todo List
const todoListContainer = document.getElementsByClassName(
  "todo-list-container"
)[0];
const todoList = document.getElementsByClassName("todo-list")[0];
const todoForm = document.getElementById("todo-form");
const editBtn = document.getElementById("edit-btn");
const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
let emptyListMessage;

const listValues = [
  "HTML",
  "CSS",
  "React",
  "Angular",
  "Zustand",
  "NextJS",
  "TypeScript",
];
const btnIds = ["edit-btn", "save-btn", "delete-btn"];
const btnIcons = ["pencil", "save", "delete"];

const renderTodoList = () => {
  for (value of listValues) {
    createAndAppendNewItem(value);
  }
  document.removeEventListener("DOMContentLoaded", renderTodoList);
};

const createAndAppendNewItem = (inputText) => {
  const listElement = document.createElement("li");
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.value = inputText;
  inputElement.readOnly = true;
  listElement.append(inputElement);
  for (let index = 0; index < 3; index++) {
    const btnElement = document.createElement("button");
    btnElement.id = btnIds[index];
    btnElement.type = "button";
    if (index === 1) {
      btnElement.style.display = "none";
    }
    const imgElement = document.createElement("img");
    imgElement.src = `/images/${btnIcons[index]}.svg`;
    imgElement.alt = btnIcons[index];

    btnElement.append(imgElement);
    listElement.append(btnElement);
  }
  todoList.append(listElement);
};

const handleForm = (event) => {
  event.preventDefault();
  const todoInput = todoForm.children[0];
  createAndAppendNewItem(todoInput.value);
  todoInput.value = "";
  if (emptyListMessage) {
    emptyListMessage.style.display = "none";
  }
  todoList.style.display = "block";
};

const handleTodoBtnClick = (event) => {
  const clickedBtn = event.target.parentNode;
  const clickedItem = clickedBtn.parentNode;
  const inputField = clickedItem.children[0];
  if (clickedBtn.type === "button") {
    switch (clickedBtn.id) {
      case editBtn.id:
        {
          clickedItem.children[1].style.display = "none";
          clickedItem.children[2].style.display = "block";
          inputField.readOnly = false;
          inputField.style.outline = "auto";
          inputField.style.fieldSizing = "fixed";
          inputField.focus();
          inputField.setSelectionRange(
            inputField.value.length,
            inputField.value.length
          );
        }
        break;

      case saveBtn.id:
        {
          clickedItem.children[1].style.display = "block";
          clickedItem.children[2].style.display = "none";
          inputField.readOnly = true;
          inputField.style.outline = "none";
          inputField.style.fieldSizing = "content";
        }
        break;

      case deleteBtn.id: {
        clickedItem.remove();

        if (todoList.children.length === 0) {
          todoList.style.display = "none";
          emptyListMessage = document.createElement("h1");
          emptyListMessage.style.fontSize = "1.8rem";
          emptyListMessage.append("Oops! List is empty");
          todoListContainer.append(emptyListMessage);
        }
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", renderTodoList);
todoForm.addEventListener("submit", handleForm);
todoList.addEventListener("click", handleTodoBtnClick);
