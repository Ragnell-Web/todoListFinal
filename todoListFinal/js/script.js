// get an elements
const clear = document.querySelector(`.clear`)
const dateElement = document.getElementById(`date`)
const list = document.getElementById(`list`)
const input = document.getElementById(`input`)

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

//get item from localstorage
let data = localStorage.getItem(`TODO`);
if (data) {
  LIST = JSON.parse(data)
  loadToDo(LIST)
  id = LIST.length
} else {
  LIST = [];
  id = 0;
  showDate()
}

function loadToDo(array) {
  array.forEach(item => {
    addToDo(item.name, item.id, item.done, item.trash)
  });
}

function addToDo(toDo, id, done,trash) {
  if (trash) { return;}
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : ``;
  const text = /*html*/ `
    <li class="item">
      <i class="fa ${DONE} co" job="complete" id="${id}"></i>
      <p class="text ${LINE}">${toDo}</p>
      <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
  `;

  const position = `beforeend`;//agar li ditaruh setelah lastchild
  list.insertAdjacentHTML(position, text)
}

document.addEventListener(`keyup`, e => {
  if (e.keyCode === 13) {
    const toDo = input.value
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id,
        done: false,
        trash : false
      })
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++
    }
    input.value = ``;
  }
})
//complete to-do
function completeToDo(element) {
  element.classList.toggle(CHECK)
  element.classList.toggle(UNCHECK)
  element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH)

  LIST[element.id].done = LIST[element.id].done ? false : true;
}
//remove to-do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

list.addEventListener(`click`, function (e) {
  const element = e.target;
  const elementJob = element.attributes.job.value;
  if (elementJob == `complete`) {
    completeToDo(element);
  } else if (elementJob == `delete`) {
    removeToDo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

clear.addEventListener(`click`, function () {
  localStorage.clear();//membersihkan local storage
  location.reload();//mereload halaman
})
 
function showDate() {
  const options = { weekday: "long", month: `short`, day: `numeric` };
  const today = new Date();
  dateElement.innerHTML = today.toLocaleDateString(`id-ID`, options);
}