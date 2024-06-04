let tasksContainer = document.getElementById('tasksContainer')
let btnAgregar = document.getElementById('btnAggTask')
let input = document.getElementById('inputAggTask')

btnAgregar.addEventListener('click', function () {

    if (input.value.trim() === "") {
        alert('BRO?')
    } else {
        let containerDivs = document.createElement('div')
        containerDivs.id="containerDivs"
        tasksContainer.appendChild(containerDivs)

        let checkbox = document.createElement("input");
        checkbox.id="checkbox";
        checkbox.type = "checkbox";
        containerDivs.appendChild(checkbox);
        
        let task = document.createElement("div");
        task.id="task"
        task.innerHTML = input.value;
        containerDivs.appendChild(task);

        let eliminar = document.createElement("img");
        eliminar.src = "img/icons8-trash-50.png"
        eliminar.id="eliminar";
        containerDivs.appendChild(eliminar)

        eliminar.addEventListener("click", () => {
            tasksContainer.removeChild(containerDivs);
            return task, checkbox
        })
    }
})