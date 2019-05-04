var todoList = {
    todos: [],
    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function (position, todoText) {
        //this.todos[position] = newValue;
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function () {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        //Get number of completed todos.
        for (var i = 0; i < totalTodos; i++) {
            if (this.todos[i].completed === true) {
                completedTodos++;
            }
        }
        // Case 1: if everything is true, make everything false,
        if (completedTodos === totalTodos) {
            //make everything false.
            for (var i = 0; i < totalTodos; i++) {
                this.todos[i].completed = false;
            }
        } else {
            //Case 2: otherwise, make everything true.
            for (var i = 0; i < totalTodos; i++) {
                this.todos[i].completed = true;
            }
        }
    }
};

var handlers = {
    toggleAll: function () {
        todoList.toggleAll();
        view.displyTodos();
    },
    addTodo: function () {
        var addTodoTextInput = document.getElementById("addTodoTextInput");
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = "";
        view.displyTodos();
    },
    changeTodo: function () {
        var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
        var changeTodoTextInput = document.getElementById("changeTodoTextInput");
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = "";
        changeTodoTextInput.value = "";
        view.displyTodos();
    },
    deleteTodo: function (position) {
        todoList.deleteTodo(position);
        view.displyTodos();
    },
    toggleCompleted: function () {
        var toggleCompletedPositionInpt = document.getElementById("toggleCompletedPositionInpt");
        todoList.toggleCompleted(toggleCompletedPositionInpt.valueAsNumber);
        toggleCompletedPositionInpt.value = "";
        view.displyTodos();
    }

};

var view = {
    displyTodos: function () {
        var todosUl = document.querySelector("Ul");
        todosUl.innerHTML = "";
        for (var i = 0; i < todoList.todos.length; i++) {
            var todoLi = document.createElement("li");
            var todo = todoList.todos[i]
            var todoTextWithCompleteion = "";

            if (todo.completed === true) {
                todoTextWithCompleteion = "(x)" + todo.todoText;
            } else {
                todoTextWithCompleteion = "( )" + todo.todoText;
            }
            todoLi.id = i;
            todoLi.textContent = todoTextWithCompleteion;
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        };
    },
    createDeleteButton: function () {
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = deleteButton;
        return deleteButton;
    }
};

var todosUl = document.querySelector("ul");

todosUl.addEventListener("click", function (event) {
    var elementClicked = event.target;
    if (elementClicked.className === "deleteButton") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    }
});
