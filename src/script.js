let tasksContainer = document.getElementById('tasksContainer'); // Llamo al div que contendrá a las tareas.
let btnAgregar = document.getElementById('btnAggTask'); // Llamo al botón de "Agregar".
let input = document.getElementById('inputAggTask'); // Llamo al input en el cual voy a escribir mi tarea.
let spaceNum = document.getElementById('spaceNum'); // Llamo al espacio del contador de tareas hechas.

btnAgregar.addEventListener('click', function () {  // Función
    if (input.value.trim() === "") {              // Valido si el espacio del input está vacío.
        alert('BRO?')
    } else {
        addTaskToServer({ task: input.value });
        getTasks();
    }
});



// setTimeout(() => {
//     input.textContent = ''
// }, 10);



// setTimeout(() => {
//     setTimeout(() => {
//         getTasks();
//     }, 10);
// }, 10);







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
async function getTasks() {
    const response = await fetch("http://localhost:3000/api/todo");
    const tasks = await response.json();
    tasksContainer.innerHTML = '';

    for (const task of tasks) {
        let containerDivs = document.createElement('div');    // Hago un div que será el espacio en el que próximamente.
        containerDivs.id = "containerDivs";                       // Otorgo un id al contenedor de divs.
        containerDivs.dataset.taskId = task.id;                   // Guardo el ID de la tarea en un atributo de datos.
        tasksContainer.appendChild(containerDivs);             // Lo asigno como hijo de tasksContainer.

        let checkbox = document.createElement("input");        // Creo el input que luego se convertirá en un checkbox.
        checkbox.id = "checkbox";                          // Otorgo un id a ese checkbox.
        checkbox.type = "checkbox";                        // Convierto ese input en un checkbox.
        containerDivs.appendChild(checkbox);              // Lo asigno como hijo de containerDivs.

        let taskDiv = document.createElement("div");          // Creo una task, que será el texto.
        taskDiv.id = "task";                                      // Le otorgo un id.
        taskDiv.innerHTML = task.task;                          // Le digo que en él se escribirá lo mismo que haya en el input.
        containerDivs.appendChild(taskDiv);                     // Lo asigno como hijo de containerDivs.

        let eliminar = document.createElement("img");           // Genero un espacio de imagen.
        eliminar.src = "img/icons8-trash-50.png";                 // Coloco la imagen que quiero que aparezca.
        eliminar.id = "eliminar";                                  // Le otorgo un id.
        
        eliminar.addEventListener('click', function() {
            deleteTask(task.id);
        });
        containerDivs.appendChild(eliminar);

        checkbox.addEventListener('click', function () {
            if (checkbox.checked) { // Valido si el checkbox está en estado de "checked".
                spaceNum.innerHTML = parseInt(spaceNum.innerHTML) + 1; // Si está en "checked", el contador (spaceNum) aumentará.
            } else {
                spaceNum.innerHTML = parseInt(spaceNum.innerHTML) - 1; // Si no está en "checked", el contador (spaceNum) decrecerá.
            }
        });
    }
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