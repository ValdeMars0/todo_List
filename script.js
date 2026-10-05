let toDoList = document.getElementsByClassName("todo-list");
let currentTask = [];
let jsonString = localStorage.getItem("taskList");
if (jsonString !== null) {
  currentTask = JSON.parse(jsonString);
  for (let i = 0; i < currentTask.length; i++) {
    addItem(currentTask[i]);
  }
} else {
  currentTask = [];
}
function canAddItem() {
  let inputItem = document.getElementById("inputItem");
  let inputText = inputItem.value;
  if (inputText.trim() !== "") {
    addItem(inputText);
    currentTask.push(inputText);
    save();
  }
}
function addItem(inputText) {
  let item = document.createElement("li");
  item.className = "todo-item";
  let itemText = document.createElement("div");
  itemText.className = "item_text";
  itemText.textContent = inputText;
  let delBtn = document.createElement("button");
  delBtn.className = "item_delete-btn";
  delBtn.textContent = "Удалить";
  delBtn.addEventListener("click", function () {
    deleteItem(item, inputText);
  });
  item.appendChild(itemText);
  item.appendChild(delBtn);
  toDoList[0].appendChild(item);
  inputItem.value = "";
}
function deleteItem(item, textToRemove) {
  let index = currentTask.indexOf(textToRemove);
  if (index !== -1) {
    currentTask.splice(index, 1);
  }
  item.remove();
  save();
}
function save() {
  localStorage.clear();
  let jsonStr = JSON.stringify(currentTask);
  localStorage.setItem("taskList", jsonStr);
}
