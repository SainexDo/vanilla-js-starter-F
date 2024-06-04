let tasksContainer = document.getElementById('tasksContainer') //Llamo al div que contendrá a las tareas.
let btnAgregar = document.getElementById('btnAggTask') //Llamo al botón de "Agregar".
let input = document.getElementById('inputAggTask') //Llamo al input en el cual voy a escribir mi tarea.
let spaceNum = document.getElementById('spaceNum') //Llamo al espacio del contador de tareas hechas.

btnAgregar.addEventListener('click', function () {  //Función 
    if (input.value.trim() === "") {              //Valido si el espacio del input está vacío.
        alert('BRO?')
    } else {
        let containerDivs = document.createElement('div')    //Hago un div que será el espacio en el que proximamente.
        containerDivs.id="containerDivs"                       //Otorgo un id al contenedor de divs.
        tasksContainer.appendChild(containerDivs)             //Lo asigno como hijo de tasksContainer.

        let checkbox = document.createElement("input")        //Creo el input que luego se convertirá en un checkbox.
        checkbox.id="checkbox";                          //Otorgo un id a ese checkbox.
        checkbox.type = "checkbox";                        //Convierto ese input en un checkbox.
        containerDivs.appendChild(checkbox);              //Lo asigno como hijo de containerDivs.
        
        let task = document.createElement("div")          //Creo una task, que será el texto.
        task.id="task"                                      //Le otorgo un id.
        task.innerHTML = input.value;                          //Le digo que en él se escribirá lo mismo que haya en el input.
        containerDivs.appendChild(task);                     //Lo asigno como hijo de containerDivs.

        let eliminar = document.createElement("img")           //Genero un espacio de imagen.
        eliminar.src = "img/icons8-trash-50.png"                 //Coloco la imagen que quiero que aparezca.
        eliminar.id="eliminar";                                  //Le otorgo un id.
        containerDivs.appendChild(eliminar)                        //Lo asigno como hijo de containerDivs.

        eliminar.addEventListener("click", () => {              //Función que se encargará de eliminar el div que contiene la tarea.
            if (checkbox.checked) {                                //Valido si el checkbox está en estado de "checked".
                tasksContainer.removeChild(containerDivs);            //Se elimina el div que contiene toda la task.
                spaceNum.innerHTML = parseInt(spaceNum.innerHTML)-1    //Disminuye el contador si es que la tarea estaba en "checked".
                return task, checkbox                                 
            } else {
                tasksContainer.removeChild(containerDivs);         //Por el contrario, si el checkbox no estuviera en "checked",
                return task, checkbox                               // sólo se eliminaría toda la tarea, sin bajar el contador de tareas.
            }
        })
        checkbox.addEventListener('click', function () {
            if (checkbox.checked) {                                  //Valido si el checkbox está en estado de "checked".
                spaceNum.innerHTML = parseInt(spaceNum.innerHTML)+1        //Si está en "checked", el contador (spaceNum) aumentará.
            } else {
                spaceNum.innerHTML = parseInt(spaceNum.innerHTML)-1        //Si no está en "checked", el contador (spaceNum) decrecerá.
            }
        })
    }
})