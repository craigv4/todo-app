// selectors

const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");

const divClasses = ["flex", "justify-end", "space-x-2", "mx-8", "my-3", "border-2", "border-gray-300", "p-2", "rounded-lg", "todo-item"];
const liClasses = ["list-none", "font-bold", "flex-1", "text-xl", "tracking-widest"];

// functions

const addTodo = (e) => {
	e.preventDefault();

	if (!todoInput.value) {
		return;
	} else {
		const todoDiv = document.createElement("div");
		todoDiv.classList.add(...divClasses);
		const todoListItem = document.createElement("li");
		todoListItem.classList.add(...liClasses);
		todoListItem.textContent = todoInput.value;
		todoDiv.appendChild(todoListItem);
		saveLocalTodos(todoInput.value);
		const checkBtn = document.createElement("button");
		checkBtn.innerHTML = '<i class="fa fa-check-square text-3xl text-green-700 "></i>';
		const deleteBtn = document.createElement("button");
		deleteBtn.innerHTML = '<i class="fa fa-minus-square text-3xl text-red-700 "></i>';
		todoDiv.appendChild(checkBtn);
		todoDiv.appendChild(deleteBtn);
		todoList.appendChild(todoDiv);

		todoInput.value = "";
	}
};

const actionBtn = (e) => {
	parentDiv = e.target.parentElement.parentElement;

	if (e.target.classList[1] === "fa-minus-square") {
		parentDiv.classList.add("removed");
		removeLocalTodos(parentDiv);
		parentDiv.classList.remove("todo-item");
		parentDiv.addEventListener("transitionend", () => {
			parentDiv.remove();
		});
	}

	if (e.target.classList[1] === "fa-check-square") {
		parentDiv.firstElementChild.classList.toggle("checked");
		parentDiv.classList.toggle("checked-div");
		parentDiv.classList.toggle("order-last");
	}
};

const saveLocalTodos = (todo) => {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
};

function removeLocalTodos(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	const todoIndex = todo.children[0].textContent;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}

const getTodos = () => {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach((todo) => {
		const todoDiv = document.createElement("div");
		todoDiv.classList.add(...divClasses);
		const todoListItem = document.createElement("li");
		todoListItem.classList.add(...liClasses);
		todoListItem.textContent = todoInput.value;
		todoDiv.appendChild(todoListItem);
		const checkBtn = document.createElement("button");
		checkBtn.innerHTML = '<i class="fa fa-check-square text-3xl text-green-700 "></i>';
		const deleteBtn = document.createElement("button");
		deleteBtn.innerHTML = '<i class="fa fa-minus-square text-3xl text-red-700 "></i>';
		todoDiv.appendChild(checkBtn);
		todoDiv.appendChild(deleteBtn);
		todoList.appendChild(todoDiv);
	});
};

// eventListeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", actionBtn);
