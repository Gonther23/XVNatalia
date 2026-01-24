document.addEventListener("DOMContentLoaded", function () {

  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("nombre");
  const asistentes = params.get("asistentes");

  // ---------- NOMBRE DEL INVITADO ----------
  if (guestName) {
    const decodedName = decodeURIComponent(guestName);
    const heading = document.querySelector("#name .elementor-heading-title");

    if (heading) {
      heading.textContent = decodedName;
    }

    // Campo hidden para Formspree
    let inputName = document.createElement("input");
    inputName.type = "hidden";
    inputName.name = "invitado";
    inputName.value = decodedName;
    document.getElementById("my-form").appendChild(inputName);
  }

  // ---------- PERSONAS ----------
  if (asistentes) {
    const select = document.getElementById("form-field-noTickets");
    const hiddenPersonas = document.getElementById("hidden-personas");

    if (select) {
      select.innerHTML = "";

      const option = document.createElement("option");
      option.value = asistentes;
      option.textContent = asistentes + " personas";
      option.selected = true;

      select.appendChild(option);
    }

    if (hiddenPersonas) {
      hiddenPersonas.value = asistentes;
    }
  }

});


 const form = document.getElementById("my-form");
  const status = document.getElementById("my-form-status");

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        "Accept": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "✅ ¡Gracias! Tu confirmación fue enviada.";
        form.reset();
      } else {
        response.json().then(data => {
          if (data.errors) {
            status.innerHTML = data.errors.map(error => error.message).join(", ");
          } else {
            status.innerHTML = "❌ Ocurrió un error al enviar el formulario.";
          }
        });
      }
    }).catch(() => {
      status.innerHTML = "❌ Ocurrió un error al enviar el formulario.";
    });
  }

  form.addEventListener("submit", handleSubmit);




  /**
   * 
   */

document.addEventListener("DOMContentLoaded", function () {

  const params = new URLSearchParams(window.location.search);
  const asistentes = parseInt(params.get("asistentes"), 10);

  if (!asistentes || asistentes < 1) return;

  const select = document.getElementById("form-field-noTickets");
  if (!select) return;

  // Limpiar por seguridad
  select.innerHTML = "";

  // Generar opciones dinámicas
  for (let i = 1; i <= asistentes; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i === 1 ? "1 persona" : `${i} personas`;

    // Seleccionar el máximo permitido
    if (i === asistentes) {
      option.selected = true;
    }

    select.appendChild(option);
  }

});