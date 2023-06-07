//setting the items
const alert = document.querySelector(".alert");
const form = document.querySelector(".todo-form");
const todo = document.getElementById("todo");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".todo-container");
const list = document.querySelector(".todo-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// EVENT-LISTENER

// 1.submit
form.addEventListener("submit", addItem);

// 2.delete item
clearBtn.addEventListener('click', clearItems);

// FUNCTIONS

// 1. additem//CREATE
function addItem(e) {
  e.preventDefault();
  const value = todo.value;

  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    const element = document.createElement("article");
    // add class
    element.classList.add("todo-item");
    // add id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    // put the element here
    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
        </button>
    </div>
    `;

    // append child
    list.appendChild(element);// idudugtong mo na tong list dun sa element na ginawa mo na target ay yung article

    // displayAlert
    displayAlert("Item added to the list", "success");

    // show container
    container.classList.add("show-container");


    // add to local storage
    addToLocalStorage(id, value);

    // setback to default
    setBackToDefault();
  } else if (value && editFlag) {
    console.log("editing");
  } else {
    displayAlert("Please enter Value", "danger");
    console.log("no value");
  }
}

// DISPLAY ALERT FUNCTION
function displayAlert(text, action) {
  // display alert
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1500);
}


// SET BACK TO DEFAULT
function setBackToDefault(){
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
    console.log("added to local storage");
}

// LOCAL STORAGE
function addToLocalStorage(id, value){
    console.log("added to local storage")
}