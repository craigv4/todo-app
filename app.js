// selectors

const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoContainer = document.getElementById("todo-container");
const todoList = document.getElementById("todo-list");

// functions

const addTodo = (event) => {
	event.preventDefault();

	const todoDiv = document.createElement("div");
	todoDiv.classList.add("flex", "justify-end", "space-x-2", "mx-8", "my-3", "border-2", "border-gray-300", "p-2", "rounded-lg");
	const todoListItem = document.createElement("li");
	todoListItem.classList.add("list-none", "font-bold", "flex-1");
	todoListItem.textContent = todoInput.value;
	todoDiv.appendChild(todoListItem);

	saveLocalTodos(todoInput.value);

	const checkBtn = document.createElement("button");
	checkBtn.innerHTML = '<i class="fa fa-check-square text-xl text-green-700"></i>';
	const deleteBtn = document.createElement("button");
	deleteBtn.innerHTML = '<i class="fa fa-minus-square text-xl text-red-700"></i>';
	todoDiv.appendChild(checkBtn);
	todoDiv.appendChild(deleteBtn);
	todoList.appendChild(todoDiv);

	todoInput.value = "";

	// } else {
	// 	todoInput.classList.add("border", "border-red-600");
	// }
};

const checkDelete = (e) => {
	parentDiv = e.target.parentElement.parentElement;

	if (e.target.classList[1] === "fa-minus-square") {
		parentDiv.classList.add("removed");
		// parentDiv.remove();
		parentDiv.addEventListener("transitionend", () => {
			parentDiv.remove();
		});
	}

	if (e.target.classList[1] === "fa-check-square") {
		parentDiv.firstElementChild.classList.toggle("checked");
		parentDiv.classList.toggle("checked-div");
		parentDiv.classList.toggle("order-last");
		// console.log(parentDiv.parentElement);
	}
};

const saveLocalTodos = (todo) => {
	// check if we already have a todo

	let todos;

	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.forEach((todo) => {
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("flex", "justify-end", "space-x-2", "mx-8", "my-3", "border-2", "border-gray-300", "p-2", "rounded-lg");
		const todoListItem = document.createElement("li");
		todoListItem.classList.add("list-none", "font-bold", "flex-1");
		todoListItem.textContent = todo;
		todoDiv.appendChild(todoListItem);

		const checkBtn = document.createElement("button");
		checkBtn.innerHTML = '<i class="fa fa-check-square text-xl text-green-700"></i>';
		const deleteBtn = document.createElement("button");
		deleteBtn.innerHTML = '<i class="fa fa-minus-square text-xl text-red-700"></i>';
		todoDiv.appendChild(checkBtn);
		todoDiv.appendChild(deleteBtn);
		todoList.appendChild(todoDiv);
	});
};

// eventListeners

document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkDelete);
