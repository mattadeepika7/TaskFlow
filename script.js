let tasks = [];
let count = 0;
let draggedTask = null;

function addTask() {
    let name = document.getElementById("task").value;

    if (name == "") {
        alert("Enter a task");
        return;
    }

    tasks.push({
        id: count,
        name: name,
        status: "todo"
    });

    count++;
    document.getElementById("task").value = "";

    showTasks();
}

function showTasks() {
    document.getElementById("todo").innerHTML = "";
    document.getElementById("progress").innerHTML = "";
    document.getElementById("completed").innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        let task = document.createElement("div");

        task.className = "task";
        task.draggable = true;

        task.innerHTML =
            tasks[i].name +
            "<br>" +
            "<button class='edit' onclick='editTask(" + i + ")'>Edit</button>" +
            "<button class='delete' onclick='deleteTask(" + i + ")'>Delete</button>";

        // Laptop drag
        task.ondragstart = function() {
            draggedTask = i;
        };

        // Mobile touch
        task.addEventListener("touchstart", function() {
            draggedTask = i;
        });

        document.getElementById(tasks[i].status).appendChild(task);
    }
}

function editTask(i) {
    let name = prompt("Enter new task:", tasks[i].name);

    if (name != null && name != "") {
        tasks[i].name = name;
        showTasks();
    }
}

function deleteTask(i) {
    tasks.splice(i, 1);
    showTasks();
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, status) {
    event.preventDefault();

    if (draggedTask != null) {
        tasks[draggedTask].status = status;
        draggedTask = null;
        showTasks();
    }
}
