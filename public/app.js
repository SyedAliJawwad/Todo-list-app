//Variables
let todos;


//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listerners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

//delete or check
function deleteOrCheck(e) {
    const item = e.target;

    //delete todo
    if (item.classList.contains("trash-btn")) {


        //add animation class
        todo = item.parentElement;
        todo.classList.add("fall");

        //remove todos from the local storage
        removeLocalTodos(todo);

        //remove after transition using transitionend event
        item.parentElement.addEventListener('transitionend', function () {
            todo.remove();
            console.log("transition ended");
        });

    }

    //check todo
    if (item.classList.contains("complete-btn")) {
        item.parentElement.classList.toggle("completed");
    }
}

//Filter from Dropdown
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "All":
                todo.style.display = "flex";
                break;
            case "Completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "Incompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });

}

//function to Save to the local storage 
function saveLocalTodos(todo) {
    //CHECK if any already present
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//function to get and show todo from local storaage
function getTodos(todo) {
    //CHECK if any already present
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {

        //Create div,li, btns elements and append to todoList(ul)
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completeButton = document.createElement("button");
        completeButton.innerHTML = `<i class="fas fa-check"></i>`
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //APPENT to todoList(ul)
        todoList.appendChild(todoDiv);

        //CLEAR todo input value
        todoInput.value = "";

    })
}

//Function to remove todos from the local storage
function removeLocalTodos(todo) {
    //CHECK if any already present
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//add function
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();

    //Create div,li, btns elements and append to todoList(ul)
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completeButton = document.createElement("button");
    completeButton.innerHTML = `<i class="fas fa-check"></i>`
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPENT to todoList(ul)
    todoList.appendChild(todoDiv);

    //ADD TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    //CLEAR todo input value
    todoInput.value = "";


    // const todo = `<div class="todo">
    // <li class="todo-item">   
    // <button class="trash-btn"><i class="fas fa-trash"></i></button>
    // <button class="complete-btn"><i class="fas fa-check"></i></button>
    // </li>
    // </div>`

    // todoList.insertAdjacentHTML("afterbegin", todo);
}

//Animations
gsap.from(".wrapper h1, h4", { duration: 1.5, y: 50, scale: 2, ease: "back"});
gsap.from(".wrapper hr", { duration: 2, x: -1000, ease: "power2.out"});
gsap.from(".dropdown-container, .anim", { duration: 2, x: -1000, ease: "power3.out"});
gsap.from(".todo-container", { duration: 2, y: 1000, ease: "power3.out", delay: .5});