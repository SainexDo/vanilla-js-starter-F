let tasksContainer = document.getElementById('tasksContainer'); // Llamo al div que contendrá a las tareas.
let btnAgregar = document.getElementById('btnAggTask'); // Llamo al botón de "Agregar".
let input = document.getElementById('inputAggTask'); // Llamo al input en el cual voy a escribir mi tarea.
let spaceNum = document.getElementById('spaceNum'); // Llamo al espacio del contador de tareas hechas.


btnAgregar.addEventListener('click', function () {
    if (input.value.trim() === '') {
        alert('Una tarea vacía significa no tener un futuro definido, y no tener un futuro definido, ¿significará un vacío en el ser?')
    } else {
        addTaskToServer({ task: input.value, completed: false })
        setTimeout(() => {
            getTasks()
        }, 10);
    }
})



// btnAgregar.addEventListener('click', function () {  // Función
//     if (input.value.trim() === "") {              // Valido si el espacio del input está vacío.
//         alert('BRO?')
//     } else {
//         addTaskToServer({ task: input.value, completed: false });
//         setTimeout(() => {
//             getTasks();
//         }, 10);
//     }
// });