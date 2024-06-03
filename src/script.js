let tasksContainer = document.getElementById('tasksContainer')
let btnAgregar = document.getElementById('btnAggTask')
let input = document.getElementById('inputAggTask')


btnAgregar.addEventListener('click', function () {
    let task = document.createElement('div')
    task.innerHTML = input.value
    tasksContainer.appendChild(task)
})