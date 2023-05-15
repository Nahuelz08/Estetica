const btnEnviar = document.querySelector("#btn-enviar");
const form = document.querySelector("#contactForm");
const mainNav = document.querySelector("#mainNav");

window.addEventListener("DOMContentLoaded", () => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarNav .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  const navigationHeight = mainNav.offsetHeight;

  document.documentElement.style.setProperty(
    "--scroll-padding",
    navigationHeight - 1 + "px"
  );

  // Inicialziar AOS
  AOS.init();
});

// FORM
let input_element = document.querySelectorAll("input");

input_element.forEach((el) => {
  el.addEventListener("keyup", () => {
    el.setAttribute("value", el.value);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validar();
});

function validar() {
  inputsOnChange();
  let nombreCompletoInput = document.querySelector("#nombreCompletoInput");
  let asuntoInput = document.querySelector("#asuntoInput");
  let textareaInput = document.querySelector("#textareaInput");
  let emailInput = document.querySelector("#emailInput");
  validarEmail(emailInput);
  inputErrorMsg(nombreCompletoInput, "Por favor, completar con su nombre");
  inputErrorMsg(asuntoInput, "Por favor, completar el asunto");
  inputErrorMsg(textareaInput, "Por favor, escriba un mensaje");

  !nombreCompletoInput.value == "" &&
    inputSuccess(nombreCompletoInput, "Campo valido");
  !asuntoInput.value == "" && inputSuccess(asuntoInput, "Campo valido");
  !textareaInput.value == "" && inputSuccess(textareaInput, "Campo valido");
  if (
    !nombreCompletoInput.value == "" &&
    !asuntoInput.value == "" &&
    !textareaInput.value == ""
  ) {
    validarEmail(emailInput) && form.submit();
  }
}

// Validar email
function validarEmail(input) {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (input.value.match(mailformat)) {
    inputSuccess(input, "Email valido");
    return true;
  } else {
    inputErrorMsg(input, "Email invalido");
    return false;
  }
}

function inputErrorMsg(input, msg) {
  const formControl = input.parentElement;
  let small = formControl.querySelector("small");
  formControl.classList.remove("success");
  formControl.classList.add("error");
  small.innerText = msg;
  small.style.visibility = "visible";
}
function inputSuccess(input, msg) {
  const formControl = input.parentElement;
  let small = formControl.querySelector("small");
  formControl.classList.remove("error");
  formControl.classList.add("success");
  small.innerText = msg;
  small.style.visibility = "visible";
}
function inputsSuccOErr(input, msg) {
  if (input.value == "") {
    inputErrorMsg(input, msg);
  } else {
    inputSuccess(input, msg);
  }
}
function inputsOnChange() {
  let inputs = document.querySelectorAll("input");
  let textarea = document.querySelector("textarea");

  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      input.parentElement.classList.remove("error");
      let small = input.parentElement.querySelector("small");
      small.style.visibility = "hidden";
    });
  });
  textarea.addEventListener("change", () => {
    textarea.parentElement.classList.remove("error");
    let small = textarea.parentElement.querySelector("small");
    small.style.visibility = "hidden";
  });
}
// Prevenir enviar forms con Enter
function prevenirEnter() {
  document.querySelectorAll("input[type=text]").forEach((node) =>
    node.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        e.preventDefault();
      }
    })
  );
  document.querySelectorAll("input[type=number]").forEach((node) =>
    node.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        e.preventDefault();
      }
    })
  );
}
