const todos = [
  { text: "Lära mig branches", done: false },
  { text: "Skapa PR och få review", done: false },
  { text: "Lösa en mergekonflikt", done: false },
];

const listEl = document.getElementById("todoList");
const addBtn = document.getElementById("addBtn");
const inputEl = document.getElementById("todoInput");

// -------------------
// LocalStorage funktioner 
// -------------------
function saveToLocal() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadFromLocal() {
  const stored = localStorage.getItem("todos");
  if (stored) {
    const parsed = JSON.parse(stored);
    todos.splice(0, todos.length);
    parsed.forEach(item => todos.push(item));
  }
}

// -------------------
// Rendera listan
// -------------------
function render() {
  listEl.innerHTML = "";
  todos.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = "item" + (t.done ? " done" : "");

    const label = document.createElement("span");
    label.textContent = t.text;

    const spacer = document.createElement("span");
    spacer.className = "spacer";

    // Klar/Ångra-knapp
    const toggle = document.createElement("button");
    toggle.textContent = t.done ? "Ångra" : "Klar";
    toggle.onclick = () => {
      todos[i].done = !todos[i].done;
      saveToLocal();  
      render();
    };

    // Ta bort-knapp
    const del = document.createElement("button");
    del.textContent = "Ta bort";
    del.onclick = () => {
      todos.splice(i, 1);
      saveToLocal();  
      render();
    };

    li.append(label, spacer, toggle, del);
    listEl.appendChild(li);
  });
}

// -------------------
// Lägg till ny uppgift
// -------------------
function addTodoManual(text) {
  todos.unshift({ text: text, done: false });
  saveToLocal();  
  render();
}

addBtn.addEventListener("click", () => {
  const val = inputEl.value.trim();
  if (!val) return;
  addTodoManual(val);
  inputEl.value = "";
});

// -------------------
// Initiera sidan
// -------------------
loadFromLocal(); // Ladda todos från localStorage
render();        // Visa dem på sidan
