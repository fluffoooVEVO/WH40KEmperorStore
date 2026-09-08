const formularioContacto = document.getElementById("form-contacto");
formularioContacto.addEventListener("submit", function(event) {
    event.preventDefault();
    M.toast({
        html: "Mensaje enviado correctamente"
    });
    formularioContacto.reset();
    M.updateTextFields();
});