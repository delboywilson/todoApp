const submit = document.getElementById("submit");

submit.addEventListener("click", validate);

function validate(e) {
  e.preventDefault();

  const todoField = document.getElementById("newtodo");
  let valid = true;

  if (!todoField.value) {
    const todoError = document.getElementById("todoError");
    todoError.classList.add("visible");
    todoField.classList.add("invalid");
    todoError.setAttribute("aria-hidden", false);
    todoError.setAttribute("aria-invalid", true);
  }
  return valid;
}
