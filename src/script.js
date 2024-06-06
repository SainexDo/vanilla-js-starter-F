let tasksContainer = document.getElementById('tasksContainer');
let btnAgregar = document.getElementById('btnAggTask');
let input = document.getElementById('inputAggTask');
let spaceNum = document.getElementById('spaceNum');
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (input.value.trim() === '') {
            alert('No se pueden añadir tareas vacías');
        } else {
            addTaskToServer({ task: input.value, completed: false });
            setTimeout(() => {
                getTasks();
            }, 10);
        }
        input.value = ''
    }
});
btnAgregar.addEventListener('click', function () {
    if (input.value.trim() === '') {
        alert('No se pueden añadir tareas vacías');
    } else {
        addTaskToServer({ task: input.value, completed: false });
        setTimeout(() => {
            getTasks();
        }, 10);
    }
    input.value = ''
});
function addTaskToServer(taskData) {
    fetch('http://localhost:3000/api/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
}
async function updateTask(id, taskData) {
    const response = await fetch('http://localhost:3000/api/todo/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    });
    if (response.ok) {
        getTasks();
    } else {
        console.error('Error updating task:', response.statusText);
    }
}
async function getTasks() {
    const response = await fetch("http://localhost:3000/api/todo");
    const tasks = await response.json();
    tasksContainer.innerHTML = '';
    let completedCount = 0;
    for (const task of tasks) {
        let containerDivs = document.createElement('div');
        containerDivs.id = "containerDivs";
        containerDivs.dataset.taskId = task.id;
        tasksContainer.appendChild(containerDivs);
        let checkbox = document.createElement("input");
        checkbox.id = "checkbox";
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        containerDivs.appendChild(checkbox);
        if (task.completed) {
            completedCount++;
        }
        let taskDiv = document.createElement("div");
        taskDiv.id = "task";
        taskDiv.innerHTML = task.task;
        containerDivs.appendChild(taskDiv);
        let eliminar = document.createElement("div");
        eliminar.id = "eliminar";
        eliminar.innerHTML = '🗑️'
        eliminar.addEventListener('click', function() {
            deleteTask(task.id);
        });
        containerDivs.appendChild(eliminar);
        checkbox.addEventListener('click', function () {
            task.completed = checkbox.checked;
            updateTask(task.id, { task: task.task, completed: task.completed });
            if (checkbox.checked) {
                completedCount++;
            } else {
                completedCount--;
            }
            spaceNum.innerHTML = completedCount;
        });
    }
    spaceNum.innerHTML = completedCount;
}
async function deleteTask(id) {
    const response = await fetch('http://localhost:3000/api/todo/' + id, {
        method: 'DELETE',
    });
    if (response.ok) {
        getTasks();
    } else {
        console.error('Error deleting task:', response.statusText);
    }
}
getTasks();