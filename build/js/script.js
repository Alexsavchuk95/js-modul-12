"use strict";

const list = document.querySelector(".list"),
  form = document.querySelector(".form"),
  inputName = document.querySelector('input[type="text"]'),
  inputUrl = document.querySelector('input[type="url"]');

let savedBookmark = JSON.parse(localStorage.getItem("bookmark"));
const source = document.querySelector("#url-cards").innerHTML.trim(),
  template = Handlebars.compile(source);


if (savedBookmark === null) {
  savedBookmark = [];
}
if (savedBookmark) {
  list.innerHTML = template(savedBookmark);
}


form.addEventListener("submit", addBookmark);
function addBookmark(event) {
  event.preventDefault();
  if (savedBookmark.some(el => el.url === inputUrl.value)) {
    openModal("Закладка с таким url уже есть!");
    return;
  }
 
  const obj = {};

  obj.name = inputName.value;
  obj.url = inputUrl.value;
  savedBookmark.unshift(obj);
  list.innerHTML = template(savedBookmark);
  localStorage.setItem("bookmark", JSON.stringify(savedBookmark));
  form.reset();
  return;
}


list.addEventListener("click", delBookmark);
function delBookmark(event) {
  console.log();

  if (event.target.dataset.action !== "del") return;
  event.preventDefault();
  const ind = event.path[1];
  savedBookmark.splice(
    savedBookmark
      .map(el => el.url)
      .indexOf(ind.children[1].children[0].textContent),
    1
  );
  localStorage.setItem("bookmark", JSON.stringify(savedBookmark));
  event.path[1].remove();
  return;
}



const modal = document.querySelector(".modal-remove");
function openModal(message) {
  modal.classList.remove("modal-hidden");
  modal.innerHTML = `<div class="modal-content">
  <div class="close-btn" data-action="close-modal"></div>
  <p class="modal-text">${message}</p></div>`;
  const close = modal.querySelector(".close-btn");
  close.addEventListener("click", closeModal);
}

function closeModal() {
  modal.classList.add("modal-hidden");
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.add("modal-hidden");
  }
};