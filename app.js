const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");


let allTodos = getTodos();
updateTodoList();


todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false,
            favorite: false
        };

        allTodos.push(todoObject);
        saveTodos();
        updateTodoList();
        todoInput.value = "";
    }
}


function updateTodoList() {
    todoListUL.innerHTML = "";

    allTodos.forEach((todo, index) => {
        const todoItem = createTodoItem(todo, index);
        todoListUL.append(todoItem);
    });
}


function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    todoLI.className = "todo";

    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}" ${todo.completed ? "checked" : ""}>

        <label class="custom-checkbox" for="${todoId}">
            <i class="fa-solid fa-check"></i>
        </label>

        <label for="${todoId}" class="todo-text">
            ${todo.text}
        </label>

        <button class="edit-button" title="Edit">
            <i class="fa-solid fa-pen"></i>
        </button>

        <button class="favorite-button ${todo.favorite ? "active" : ""}" title="Favorite">
            <i class="${todo.favorite ? "fa-solid" : "fa-regular"} fa-star"></i>
        </button>

        <button class="delete-button" title="Delete">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;

    
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        saveTodos();
    });

    
    todoLI.querySelector(".delete-button").addEventListener("click", () => {
        allTodos.splice(todoIndex, 1);
        saveTodos();
        updateTodoList();
    });

    
    todoLI.querySelector(".edit-button").addEventListener("click", () => {
        const newText = prompt("Edit todo:", todo.text);
        if (newText && newText.trim()) {
            todo.text = newText.trim();
            saveTodos();
            updateTodoList();
        }
    });

    
    todoLI.querySelector(".favorite-button").addEventListener("click", () => {
        todo.favorite = !todo.favorite;
        saveTodos();
        updateTodoList();
    });

    return todoLI;
}




function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(allTodos));
}


function getTodos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}
