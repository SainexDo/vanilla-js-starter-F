let containerBottom = document.getElementById('containerBottom');
let tasksContainer = document.getElementById('tasksContainer');
let btnAgregar = document.getElementById('btnAggTask');   //Llamo desde el HTML lo que usaré más adelante.
let input = document.getElementById('inputAggTask');
let spaceNum = document.getElementById('spaceNum');
let muestraTexDeTarea = document.getElementById("muestraTexDeTarea");


let noTareas = document.createElement('div'); //Genero un div
noTareas.id = 'noTareas';
noTareas.innerText = 'Aún no hay tareas.';   //Doy un texto al div
containerBottom.appendChild(noTareas);      //Le doy un padre para que aparezca
input.addEventListener("keypress", function(event) { //Hago el evento para el boton ENTER
    if (event.key === "Enter") {
        event.preventDefault();
        if (input.value.trim() === '') {  //Valido si el input está vacío, si lo está
            alert('No se pueden añadir tareas vacías');    //envío una alerta
        } else {                                                //si no
            addTaskToServer({ task: input.value, completed: false });  //Envío la tarea escrita en el input directamente al server
            input.value = '';           //Aquí hago que el input se vacíe
        }
    }
});
btnAgregar.addEventListener('click', function () {
    if (input.value.trim() === '') {
        alert('No se pueden añadir tareas vacías');      //Aquí hago el mismo evento anterior, solo que ahora con el botón d la página
    } else {
        addTaskToServer({ task: input.value, completed: false });
        input.value = '';
    }
});

function addTaskToServer(taskData) {  //Funcion para añadir al server.
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
        getTasks();
    })
    .catch(error => {
        console.error(error);
    });
}
async function updateTask(id, taskData) { //Función para editar tareas del server.
    const response = await fetch('http://localhost:3000/api/todo/' + id, {
        method: 'PUT',   //¡Cómo costó ese método PUT, profe! :(
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    });
    if (response.ok) {
        getTasks();
    } else {
        console.error('Ocurrió un error actualizando la tarea, vago:', response.statusText);
    }
}
async function getTasks() {  //Función que permite obtener los datos del server.
    const response = await fetch("http://localhost:3000/api/todo");
    const tasks = await response.json();

    let completedCount = 0;  //Esto es parte del contador, por eso se declara en 0.

    tasksContainer.innerHTML = ''; //Aquí devuelvo el contenedor de tareas a vacío, ya que se duplicaan las cosas cuando agrego una nueva tarea, entonces elimino todo, menos las cosas que vienen del server, ya qu no se puede.

    if (tasks.length === 0) {  //Valido si no hay tareas, si no hay 
        noTareas.style.display = 'block';        //muestro el texto de que aún no hay tareas.
    } else {
        noTareas.style.display = 'none';  //Si por el contrario, si hay tareas, el texto no se mostrará.
    }

    for (const task of tasks) { //Itero dentro de la variable tasks, esto para ver el contenido del server

        let containerDivs = document.createElement('div');
        containerDivs.className = "containerDivs";   //Creo, doy className y padre a este div, luego lo vuelvo igual a un contenido del server.
        containerDivs.dataset.taskId = task.id;
        tasksContainer.appendChild(containerDivs);

        let checkbox = document.createElement("input");   //Creo, doy className y padre a este checkbox, para lugo hacer validaciones con él
        checkbox.type = "checkbox";
        checkbox.className = "checkbox"
        checkbox.checked = task.completed;
        containerDivs.appendChild(checkbox);

        if (task.completed) {
            completedCount++;  //Accedo a task.completed buscando el true y false que se suben al api cada vez que toco un checkbox.
        }

        let taskDiv = document.createElement("div");
        taskDiv.className = "tarea";
        taskDiv.innerHTML = task.task;
        containerDivs.appendChild(taskDiv);

        let editar = document.createElement('div');
        editar.className = 'editar';
        editar.innerHTML = '📖'
        editar.addEventListener('click', function () {

            let newText = prompt("Edita tu tarea:", task.task);   //Aquí uso un prompt, para escribir el nuevo texto al momemnto de editar.

            if (newText && newText.trim() !== '') {        //valido que el input no esté vacío
                updateTask(task.id, { task: newText, completed: task.completed });   //Llamo al metodo PUT, accedo y edito la task
            }
        });

        containerDivs.appendChild(editar);

        let eliminar = document.createElement("div");
        eliminar.className = 'eliminar';
        eliminar.innerHTML = '🗑️'
        eliminar.addEventListener('click', function() {
            deleteTask(task.id);
        });

        containerDivs.appendChild(eliminar);

        checkbox.addEventListener('click', function () {
            task.completed = checkbox.checked;    //Hago un evento para los checkbox, dicho evento estará constantemente editando el estado del completed en el api
            updateTask(task.id, { task: task.task, completed: task.completed });  //Cambio el estado del completed
            completedCount = checkbox.checked ? completedCount + 1 : completedCount - 1;  //Operador ternario para el contador del checkbox
            spaceNum.innerHTML = completedCount;  //Vuelvo el estado del contador igual al completedCount
        });
    }

    spaceNum.innerHTML = completedCount;

}
async function deleteTask(id) {  //Funcion que obtiene datos de la api
    const response = await fetch('http://localhost:3000/api/todo/' + id, {
        method: 'DELETE',
    });
    if (response.ok) {
        getTasks();
    } else {
        console.error('Error eliminando la tarea:', response.statusText);
    }
}


getTasks();

async function getTasks() {  //Función que permite obtener los datos del server.
    const response = await fetch("http://localhost:3000/api/todo");
    const tasks = await response.json();

    if (tasks.length === 0) {  //Valido si no hay tareas, si no hay 
        noTareas.style.display = 'block';        //muestro el texto de que aún no hay tareas.
    } else {
        noTareas.style.display = 'none';  //Si por el contrario, si hay tareas, el texto no se mostrará.
    }

    for (const task of tasks) { //Itero dentro de la variable tasks, esto para ver el contenido del server

        let containerDivs = document.createElement('div');
        containerDivs.className = "containerDivs";   //Creo, doy className y padre a este div, luego lo vuelvo igual a un contenido del server.
        containerDivs.dataset.taskId = task.id;
        tasksContainer.appendChild(containerDivs);

        let checkbox = document.createElement("input");   //Creo, doy className y padre a este checkbox, para lugo hacer validaciones con él
        checkbox.type = "checkbox";
        checkbox.className = "checkbox"
        checkbox.checked = task.completed;
        containerDivs.appendChild(checkbox);

        if (task.completed) {
            completedCount++;  //Accedo a task.completed buscando el true y false que se suben al api cada vez que toco un checkbox.
        }

        let taskDiv = document.createElement("div");
        taskDiv.className = "tarea";
        taskDiv.innerHTML = task.task;
        containerDivs.appendChild(taskDiv);

        let editar = document.createElement('div');
        editar.className = 'editar';
        editar.innerHTML = '📖'
        editar.addEventListener('click', function () {
        });

        containerDivs.appendChild(editar);

        let eliminar = document.createElement("div");
        eliminar.className = 'eliminar';
        eliminar.innerHTML = '🗑️'

        containerDivs.appendChild(eliminar);
    }
} onafterprint