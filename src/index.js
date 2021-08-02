import './css/style.css'

// movement.js
// position variables
let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

// html elements
let todoElement = document.querySelector(".todo__title");

// functions
const dragMouse = (elmnt) => {
    /*
    moves a parent element after selecting the specified child
    */

    // executes when the mouse is pressed and holded
    elmnt.onmousedown = (eventObject) => {
        // get the initial position
        pos3 = eventObject.clientX;
        pos4 = eventObject.clientY;

        // when the mouse moves over the document
        // and not over the eventObjec
        document.onmousemove = (eventObject) => {
            // update the position variables
            pos1 = pos3 - eventObject.clientX;
            pos2 = pos4 - eventObject.clientY;
            pos3 = eventObject.clientX;
            pos4 = eventObject.clientY;

            // relocate the parent
            elmnt.parentElement.style.top = (elmnt.parentElement.offsetTop - pos2) + "px";
            elmnt.parentElement.style.left = (elmnt.parentElement.offsetLeft - pos1) + "px";

            }

        // when the mouse is released again
        document.onmouseup = () => {
            // stop everything reseting the properties
            document.onmousemove = null;
            document.onmouseup   = null;
        }

    }
}
// ------

// tasks.js

const todoListDiv = document.querySelector(".todo__list");
const doneBtn     = document.querySelector(".todo__buttons--done");
const allBtn      = document.querySelector(".todo__buttons--all");

class Todo {

    constructor(){
        this.id        = new Date().getTime();
        this.completed = false;

        this.createHTML();
    }

    createHTML () {

        const htmlTodo = `
        <div class="todo__list--li" todo-id="${this.id}">

            <span>
                <img src="/src/assets/nochecked.svg" alt="" class="todo__list--input--li-box">
            </span>
            <input class="todo__list--input--li-input" type="text" placeholder="Add a new task and press Enter!">
            
        </div>
        `

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlTodo;

        todoListDiv.append(tempDiv.firstElementChild);
    }

}

class TodoList {

    constructor() {
        this.todos = [];
    }

    newTodo (todo) {
        this.todos.push(todo);
    }

    checkTodo (id) {

        for (let temp_todo of this.todos) {

            if (id == temp_todo.id) {
                temp_todo.completed = !temp_todo.completed;
            }
        }
    }

    removeDone() {

        // get the completed items
        const temp_completed = this.todos.filter(todo => todo.completed);
        const temp_ids       = [];

        temp_completed.forEach((x) => temp_ids.push(x.id));

        for (let i = todoListDiv.children.length-1; i >= 0; i--){
            const temp_todo = todoListDiv.children[i];
            const id_       = parseFloat(temp_todo.getAttribute("todo-id"));
            if (temp_ids.includes(id_)){
                todoListDiv.removeChild(temp_todo);
            }
        }
    }

    removeAll() {

        todoListDiv.innerHTML = '';

        list_object.newTodo(new Todo());
    }
}

// events
todoListDiv.addEventListener('keypress', (event) => {
    
    if (event.key === "Enter" && event.srcElement.value.length > 0){
        // Create a new todo
        list_object.newTodo(new Todo());
        let all_inputs = document.querySelectorAll('.todo__list--input--li-input');
        all_inputs[all_inputs.length - 1].focus();
    }

});

todoListDiv.addEventListener('click', (event) => {

    const localName    = event.target.localName;
    const targetObject = event.target;

    if (localName === 'img'){
        let targetInput = targetObject.parentElement.parentElement.querySelector("input");
        if (targetObject.src.includes('nochecked')){
            // check if the length > 0
            if (targetInput.value.length > 0){
                targetObject.src = 'assets/checked.svg';

                targetInput.style['text-decoration'] = 'line-through';

                // change the property of the instance
                list_object.checkTodo(targetInput.parentElement.getAttribute('todo-id'));
            }
        } else if (targetObject.src.includes('checked')){
            targetObject.src = 'assets/nochecked.svg';

            targetInput.style['text-decoration'] = '';

            // change the property of the instance
            list_object.checkTodo(targetInput.parentElement.getAttribute('todo-id'));
        }
    }
})

doneBtn.addEventListener('click', (event) => {

    list_object.removeDone();

})

allBtn.addEventListener('click', (event) => {

    list_object.removeAll();

})

// -----


// index.js
dragMouse(todoElement);

// Creates a new todo at the beginning
const list_object = new TodoList();
list_object.newTodo(new Todo());

// -----