const todos = [
  { text: "Lära mig branches", done: false },
  { text: "Skapa PR och få review", done: false },
  { text: "Lösa en mergekonflikt", done: false },
];

const listEl = document.getElementById("todoList");
const addBtn = document.getElementById("addBtn");
const inputEl = document.getElementById("todoInput");

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

function render() {
  listEl.innerHTML = "";
  todos.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = "item" + (t.done ? " done" : "");

    const label = document.createElement("span");
    label.textContent = t.text;

    const spacer = document.createElement("span");
    spacer.className = "spacer";

    const toggle = document.createElement("button");
    toggle.textContent = t.done ? "Ångra" : "Klar";
    toggle.onclick = () => {
      todos[i].done = !todos[i].done;
      saveToLocal();
      render();
    };

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

function addTodoManual(text) {
  todos.unshift({ text, done: false }); // något annorlunda
  saveToLocal();
  render();
}

let errorEl = document.getElementById("errorMsg");

addBtn.addEventListener("click", () => {
  const val = inputEl.value.trim();

  if (!val) {
    if (!errorEl) {
      errorEl = document.createElement("span");
      errorEl.id = "errorMsg";
      errorEl.className = "error";
      errorEl.textContent = "Du måste skriva något!";
      inputEl.insertAdjacentElement("afterend", errorEl);
    }
    return;
  }

  if (errorEl) {
    errorEl.remove();
    errorEl = null;
  }

  addTodoManual(val);
  inputEl.value = "";
});

inputEl.addEventListener("input", () => {
  if (errorEl && inputEl.value.trim()) {
    errorEl.remove();
    errorEl = null;
  }
});

loadFromLocal();
render();
