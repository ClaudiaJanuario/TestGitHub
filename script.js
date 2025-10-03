//Aspettiamo che il contenuto del DOM sia completamente caricato prima di eseguire il codice
document.addEventListener('DOMContentLoaded', () => {


    //URL BASE del api mock fornita da json-server
    const API_URL = 'http://localhost:5000/todos';

    //seleziono l elemento ul dove andranno inseriti i dati
    const taskList = document.getElementById('task-list');

    //seleziono il campo input per l inderimento dei nuovi task
    const newTaskInput = document.getElementById('new-task');

    // seleziona il pulsante per aggiungere  un nuovo task
    const addTaskBtn = document.getElementById('add-task');
    
    
    //Function di fetch dati

    function fetchTasks(){

        fetch(API_URL) //invia la richiesta get al endpoint API
            .then(res => res.json())  //converte la risposta in Json
            .then(data => { //una 

              taskList.innerHTML = '';  //svuoto la lista

              data.forEach(task => {  //per ogni task ricevuto...

                //creo un nuovo elemento <li>
                const li = document.createElement('li');

                //creo uno span
                const span = document.createElement('span'); //creo uno span

                span.textContent = task.title;  //imposto il testo del task
                if (task.completed) span.classList.add('done'); //aggiunge una classe  'done'

                // creo il pulsante per cmabiare lo stato del task
                const toggleBtn = document.createElement('button');
                toggleBtn.textContent = 'Done';
                toggleBtn.classList.add('toggle');
                toggleBtn.onclick = () => toggleComplete(task); //collega la funzione completato



                //creare pulsante per modificare il titolo
                const editBtn = document.createElement('button');
                editBtn.classList.add('edit');
                editBtn.textContent = 'Edit';
                //passiamo la funzione di edit
                editBtn.onclick = () => editTask(task);//collega la funzione di modifica



                //creare il pulsante per cancellare il task
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete');
                deleteBtn.textContent = 'Delete';
                //passeremo la funzione di delete task
                deleteBtn.onclick = () => deleteTask(task.id);

                //reaggrupo i bottoni in un div
                const btnGroup = document.createElement('div');
                btnGroup.append(editBtn, toggleBtn, deleteBtn);

                //aggiungo il titolo e i bottoni al  <li>, poi alla lista
                li.append(span, btnGroup);
                taskList.appendChild(li);



              });

            })
    }


    //Function di create

    addTaskBtn.addEventListener('click', () => {

        const title = newTaskInput.value.trim(); //preso il valore rimuovendo gli spazi
        
        if(title) {

            fetch(API_URL, {

                method: 'POST', //metodo post per creare risors
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({title}) //creo il task


            }).then(() => {

                newTaskInput.value = '';  //svuoto il campo input
                fetchTasks();

            });
        }

    });


    //Function di update

    function editTask(task){

        const nuovoTitolo = prompt('Modifica il task : ', task.title); //chiede il nuovo titolo

        if (nuovoTitolo !== null && nuovoTitolo.trim() !== '') {

            fetch(`${API_URL}/${task.id}`, {

                method: 'PUT', //metodo post per creare risors
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({...task, title: nuovoTitolo.trim() }) //creo il task


            }).then(
                fetchTasks()
            ); //ricarica i task
        }



    }


    //Function di delete

    function deleteTask(id) {

        fetch(`${API_URL}/${id}`, {

            method: 'DELETE',  //metodo per eliminare risorsa

    }).then(fetchTasks);//ricarica i task

    }




    //function di cambio stato "completato
   function toggleComplete(task){

         fetch(`${API_URL}/${task.id}`, {

                method: 'PUT', //metodo post per creare risors
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({...task, completed: !task.completed }) //creo il task


            }).then(
                fetchTasks()
            ); //ricarica i task

   }
   
   
fetchTasks();

});

