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

// 2.clear item
clearBtn.addEventListener("click", clearItems);

// 3. load items
window.addEventListener("DOMContentLoaded", setupItems);

// FUNCTIONS

// 1. additem//CREATE
function addItem(e) {
  e.preventDefault();
  const value = todo.value;

  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    createListItem(id, value);

    // displayAlert
    displayAlert("Item added to the list", "success");

    // show container
    container.classList.add("show-container");

    // add to local storage
    addToLocalStorage(id, value);

    // setback to default
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed", "success");
    console.log("editing");

    //edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("Please enter Value", "danger");
    console.log("no value");
  }
}

// 2. DISPLAY ALERT FUNCTION
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

// 3. CLEAR ITEM FUNCTION
function clearItems() {
  console.log("clear this");
  const items = document.querySelectorAll(".todo-item");

  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });

    // remove container
    container.classList.remove("show-container");

    // display alert
    displayAlert("List is cleared", "danger");

    // setback to default
    setBackToDefault();

    // remove from local storage
    localStorage.removeItem("list");
  }
}

// 4. DELETE FUNCTION
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement; //tinarget yung todo-item at nilagay sa var na element

  const id = element.dataset.id; //tinarget yung data-id nung item

  list.removeChild(element);
  console.log("DELETED");

  // remove show-container dun sa todo-container
  if (list.children.length === 0) {
    container.classList.remove("show-container"); //kapag zero na ang list, remove container na
  }

  displayAlert("Item deleted", "danger"); //then display tong alert na to

  setBackToDefault(); //balik ulit sa default na empty

  removeFromLocalStorage(id); //then iremove din yung item sa localstorage
}

// 5. EDIT/UPDATE FUNCTION
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement; //tinarget ulit yung grocery-item at ginawa syang laman ng element

  //set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling; // tinarget naman dito yung btn container na parentelement tapos yung p tag na  "title" as previous element sibling

  //set form value
  todo.value = editElement.innerHTML; //kasi nga ieedit mo yung loob ng html

  editFlag = true; //true sya kasi nageedit ka

  editID = element.dataset.id; //maeedit din yung dataset id nung item

  submitBtn.textContent = "edit"; // mababago yung text content nung submitbtn, magiging edit siya
  console.log("UPDATED");
}

//6. SET BACK TO DEFAULT FUNCTIONS
function setBackToDefault() {
  todo.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// LOCAL STORAGE

// 1. add to local storage
function addToLocalStorage(id, value) {
  const todo = { id, value };

  let items = getLocalStorage(); // setting the value of items sa kung ano ang meron sa getLocalStorage

  items.push(todo); // dagdag mo yung grocery sa items, item is yung laman ng getlocalstorage.magiging part na ng array yung dinagdag mo.

  localStorage.setItem("list", JSON.stringify(items)); //naka-array yung laman ng list kaya iko-convert sya sa string kasi di pwede na array laman ng localStorage
  console.log("added to local storage");
  console.log(items);
}

//2. getlocalstorage
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : []; // kunin yung laman ng localstorage then iconvert sya as object; pag walang laman yung local storage, empty array lang ang lalabas
}

// 2. remove to local storage
function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      //It filters the array of items by creating a new array that contains only the items whose id does not match the provided id.
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));

  console.log(items);
  console.log("delete from local storage");
}

// 3. edit local storage
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(function (item) {
    //It maps the array of items to a new array, where each item is modified if its id matches the provided id.
    if (item.id === id) {
      item.value = value;
    }
    //If the id matches, the function updates the value property of the item to the provided value. If the id does not match, the function returns the original item.
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));

  console.log(items);
  console.log("edit local storage");
}

//set-up items
function setupItems() {
  // this function ay yung process ng paggawa ng items ulit. at kahit ireload mo, nandun pa rin yung items sa ui at localstorge
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });  //hanggat may item sa locastorage, may item pa rin dun sa ui. nandun pa din yung createlistitem which is ang function ay ilagay yung item sa container 
    container.classList.add("show-container");
  } //It adds the class "show-container" to an element with the container variable
}

function createListItem(id, value) {
  //this function is the template /structure kapag gagawa ka ulit ng items.
  const element = document.createElement("article");
  // add id
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  //add class
  element.classList.add("todo-item");
  element.innerHTML = `<p class="title">${value}</p>
                <div class="btn-container">
                    <button type="button" class="edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button type="button" class="delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>`;

  //deletebtn
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);

  //editbtn
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}
