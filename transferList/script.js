// Transfer List

const leftList = document.getElementsByClassName("left-list")[0];
let leftListItems = document.querySelectorAll(".left-list li");

const rightList = document.getElementsByClassName("right-list")[0];
let rightListItems = document.querySelectorAll(".right-list li");

const buttonContainer = document.getElementsByClassName("btn-container")[0];
const moveAllLeftBtn = document.getElementById("move-all-left-btn");
const moveSelectedLeftBtn = document.getElementById("move-selected-left-btn");
const moveAllRightBtn = document.getElementById("move-all-right-btn");
const moveSelectedRightBtn = document.getElementById("move-selected-right-btn");

const selectedLeftListItems = {};
const selectedRightListItems = {};

const handleLeftListItem = (event) => {
  if (event.target.type === "checkbox") {
    if (event.target.checked) {
      selectedLeftListItems[event.target.id] = 1;
    } else {
      if (selectedLeftListItems.hasOwnProperty(event.target.id)) {
        delete selectedLeftListItems[event.target.id];
      }
    }

    if (Object.keys(selectedLeftListItems).length > 0) {
      moveSelectedRightBtn.disabled = false;
    } else {
      moveSelectedRightBtn.disabled = true;
    }
  }
};

const handleRightListItem = (event) => {
  if (event.target.type === "checkbox") {
    if (event.target.checked) {
      selectedRightListItems[event.target.id] = 1;
    } else {
      if (selectedRightListItems.hasOwnProperty(event.target.id)) {
        delete selectedRightListItems[event.target.id];
      }
    }

    if (Object.keys(selectedRightListItems).length > 0) {
      moveSelectedLeftBtn.disabled = false;
    } else {
      moveSelectedLeftBtn.disabled = true;
    }
  }
};

const handleButtonClick = (event) => {
  if (event.target.type === "button") {
    leftListItems = document.querySelectorAll(".left-list li");
    rightListItems = document.querySelectorAll(".right-list li");
    switch (event.target.id) {
      case "move-all-left-btn":
        {
          for (const item of rightListItems) {
            leftList.append(item);
            item.children[0].checked = false;
            delete selectedRightListItems[item.children[0].id];
          }

          moveSelectedLeftBtn.disabled = true;
        }
        break;
      case "move-selected-left-btn":
        {
          for (const item in selectedRightListItems) {
            const checkbox = document.getElementById(item);
            checkbox.checked = false;
            leftList.append(checkbox.parentNode);
            delete selectedRightListItems[item];
          }
          moveSelectedLeftBtn.disabled = true;
        }
        break;
      case "move-selected-right-btn":
        {
          for (const item in selectedLeftListItems) {
            const checkbox = document.getElementById(item);
            checkbox.checked = false;
            rightList.append(checkbox.parentNode);
            delete selectedLeftListItems[item];
          }
          moveSelectedRightBtn.disabled = true;
        }
        break;
      case "move-all-right-btn": {
        for (const item of leftListItems) {
          rightList.append(item);
          item.children[0].checked = false;
          delete selectedLeftListItems[item.children[0].id];
        }

        moveSelectedRightBtn.disabled = true;
      }
    }
    leftListItems = document.querySelectorAll(".left-list li");
    rightListItems = document.querySelectorAll(".right-list li");
    if (leftListItems.length > 0) {
      moveAllRightBtn.disabled = false;
    } else {
      moveAllRightBtn.disabled = true;
    }
    if (rightListItems.length > 0) {
      moveAllLeftBtn.disabled = false;
    } else {
      moveAllLeftBtn.disabled = true;
    }
  }
};

leftList.addEventListener("click", handleLeftListItem);
rightList.addEventListener("click", handleRightListItem);
buttonContainer.addEventListener("click", handleButtonClick);
