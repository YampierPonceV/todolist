const $ = (selector) => document.querySelector(selector);
const $All = (selector) => document.querySelectorAll(selector);

const card = $All("article.card");
const remove = $All("button.remove");
const checkbox = $All("input.checkbox");

const form = $("form");
const container = $("#container");
const container_list = $("#container_list");
const label = $(".label");
const arreglo = [];
let html = "";

function layout(text) {
  if (container_list.clientHeight > 500) {
    container.classList.add("container-list-scroll");
  }
  html = `
    <article class="card">
      <label class="label">
        <input type="checkbox" name="agregada" class="checkbox" />
      </label>
      <p>${text}</p>
      <button class="remove"></button>
    </article>
  `;
  container.innerHTML += html;
}

function save() {
  arreglo.push(container.innerHTML);
  localStorage.setItem("list", JSON.stringify(arreglo));
}

function render() {
  const data = JSON.parse(localStorage.getItem("list"));
  if (data) {
    data.forEach((item) => {
      container.innerHTML = item;
    });
  }
}

container.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
    save();
  } else if (e.target.tagName === "LABEL") {
    e.target.classList.toggle("active");
  }
});

function mostrarList(e) {
  e.preventDefault();
  const input = $("input");

  if (input.value === "") {
    return alert("No puedes dejar el campo vacío");
  }
  layout(input.value);
  input.focus();
  save();
  input.value = "";
}

render();
form.addEventListener("submit", mostrarList);
