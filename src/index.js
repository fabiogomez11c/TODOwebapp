import './css/style.css'

// movement.js
// position variables
let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

// html elements
let todoElement  = document.querySelector(".todo__title");
let timerElement = document.querySelector(".timer__title");

// functions
const dragMouse = (elmnt, move_parent=true) => {
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
            if (move_parent){
                elmnt.parentElement.style.top  = (elmnt.parentElement.offsetTop - pos2) + "px";
                elmnt.parentElement.style.left = (elmnt.parentElement.offsetLeft - pos1) + "px";
            } else {
                elmnt.style.top  = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }

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

const bodyElmnt   = document.querySelector("body")
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
                <img src="./assets/nochecked.svg" alt="" class="todo__list--input--li-box">
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
            let temp_todo = todoListDiv.children[i];
            let id_       = parseFloat(temp_todo.getAttribute("todo-id"));
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

// notes.js
class Snote {

    static newSnote () {
        new Snote();
    }

    constructor () {
        this.id = new Date().getTime();

        this.createHTML();
        this.createListener();
    }

    createListener () {
        // movement
        const note     = document.querySelector(`div[note-id="${this.id}"]`);
        dragMouse(note.firstElementChild);

        // create new note
        note.firstElementChild.children[0].addEventListener('click', (event) => {
            Snote.newSnote();
        })

        // delete the note
        note.firstElementChild.children[1].addEventListener('click', (event) => {
            bodyElmnt.removeChild(note);
        })
    }

    createHTML () {

        const htmlTodo = `
        <div class="notes" note-id="${this.id}">
            <div class="notes__icons">
                <img src="./assets/plus.svg" alt="" class="notes__icons--new">
                <img src="./assets/x.svg" alt="" class="notes__icons--close">
            </div>
            <div class="notes__input">
                <!-- <input type="text" class="notes__input--text" placeholder="Type your note here!"> -->
                <textarea class="notes__input--text" placeholder="Type your note here!"></textarea>
            </div>
        </div>
        `

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlTodo;

        bodyElmnt.append(tempDiv.firstElementChild);
    }

    deleteNote () {

    }
}
// ----


// timer.js
class webClock {

    constructor() {
        this.input         = [0,0,0,0,0,0];
        this.intervalTimer = null;
        this.createListeners();
    }

    createListeners () {
        const updownBtns  = document.querySelectorAll(".updown-buttons img");
        const timerNumber = document.querySelectorAll(".numbers img");

        for (let i = updownBtns.length - 1; i > -1; i--) {
            updownBtns[i].addEventListener('click', (event) => {
                if (i%2 !== 0) {
                    this.input[i]++
                    if (this.input[i] > 9) {
                        this.input[i] = 0
                        this.input[i - 1]++
                        if (this.input[i - 1] > 5) {
                            this.input[i] = 0
                            this.input[i - 1] = 0
                        }
                    }
                    timerNumber[i].src = `./assets/${this.input[i]}.jpg`
                    timerNumber[i - 1].src = `./assets/${this.input[i - 1]}.jpg`
                } else {
                    this.input[i + 1]--
                    if (this.input[i + 1] < 0) {
                        this.input[i + 1] = 9
                        this.input[i]--
                        if (this.input[i] < 0) {
                            this.input[i + 1] = 9
                            this.input[i] = 5
                        }
                    }
                    timerNumber[i + 1].src = `./assets/${this.input[i + 1]}.jpg`
                    timerNumber[i].src = `./assets/${this.input[i]}.jpg`
                }
            })
        }
    }

    getFutureTime () {
        // clean the input
        const hours   = parseFloat(
            String(this.input[0]) + String(this.input[1])) * 3600 * 1000;
        const minutes = parseFloat(
            String(this.input[2]) + String(this.input[3])) * 60 * 1000;
        const seconds = parseFloat(
            String(this.input[4]) + String(this.input[5])) * 1000;
        
        const totalDiff = hours + minutes + seconds;

        const nowDate   = new Date().getTime();
        return new Date(nowDate + totalDiff);
    }

    start() {
        // prevents starting without any setup
        if (this.input.reduce((acc, curr) => acc + curr) === 0){
            return null
        }

        const timerNumber = document.querySelectorAll(".numbers img");

        const futureDate = this.getFutureTime()

        this.intervalTimer = setInterval(() => {
            const nowDate  = new Date()
            const diffTime = futureDate - nowDate

            const numbers    = []
            const newNumbers = []
            numbers.push(Math.floor((diffTime % (1000*60*60*24))/(1000*60*60)))
            numbers.push(Math.floor((diffTime%(1000*60*60))/(1000*60)))
            numbers.push(Math.floor((diffTime%(1000*60))/1000))
            // console.log(numbers)
            for (let i of numbers){
                if (Math.floor(i/10) === 0) {
                    newNumbers.push("0")
                    newNumbers.push(String(i))
                } else {
                    newNumbers.push(String(i)[0])
                    newNumbers.push(String(i)[1])
                }
            }
            // console.log(newNumbers)
            for (let i = 0; i < newNumbers.length; i++) {
                this.input[i] = newNumbers[i]
                timerNumber[i].src = `./assets/${this.input[i]}.jpg`
            }

        }, 1000);
    }

    stop() {
        clearInterval(this.intervalTimer)
        this.intervalTimer = null
    }
    
    reset() {
        if (this.intervalTimer === null){
            this.input = [0,0,0,0,0,0]
            const timerNumber = document.querySelectorAll(".numbers img");
            for (let i of timerNumber) {
                i.src = `./assets/0.jpg`
            }
        }
    }
}

const startBtn = document.querySelector(".timer__buttons--start");
const stopBtn  = document.querySelector(".timer__buttons--stop");
const resetBtn = document.querySelector(".timer__buttons--reset");

startBtn.addEventListener('click', (event) => {
    clockObject.start();
})
stopBtn.addEventListener('click', (event) => {
    clockObject.stop();
})
resetBtn.addEventListener('click', (event) => {
    clockObject.reset();
})

// -----


// index.js
dragMouse(todoElement);
dragMouse(timerElement);

// Creates a new todo at the beginning
const list_object = new TodoList();
const clockObject = new webClock();

list_object.newTodo(new Todo());
new Snote();

const oldDate = new Date()
const newDate = new Date(oldDate.getTime() + 100000)
// console.log(oldDate)
// console.log(newDate)
// console.log(newDate - oldDate)

// -----