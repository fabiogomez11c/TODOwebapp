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
            elmnt.parentElement.style.left = (elmnt.parentElement.offsetLeft - pos1) + "px"

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

class Todo {

    constructor(task){
        this.task      = task;
        this.id        = new Date().getTime();
        this.completed = false;
    }

    createHTML () {

        return null;
    }

}

class TodoList {

    constructor() {
        this.todos = [];
    }

    newTodo (todo) {
        this.todos.push(todo);
    }

}

const newTodoHTML = () => {

    return null;
}

// -----


// index.js
dragMouse(todoElement);

// Creates a new todo at the beginning
const list_object = new TodoList();

// -----