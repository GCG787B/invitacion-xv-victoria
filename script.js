const sobre = document.querySelector(".sobre");

const botonUbicacion = document.querySelector(".btn-ubicacion");
const botonConfirmar = document.querySelector(".btn-confirmar");
const confirmacion = document.querySelector(".confirmacion");
const musicaFondo = document.querySelector("#musicaFondo");

// Repetir la canción automáticamente
musicaFondo.addEventListener("ended", function () {
    musicaFondo.currentTime = 0;

    musicaFondo.play().catch(function (error) {
        console.log("No se pudo reiniciar la música:", error);
    });
});


// ABRIR EL SOBRE
// ABRIR EL SOBRE Y CONTROLAR LA MÚSICA
sobre.addEventListener("click", function (event) {

    if (
    event.target.closest(".botones") ||
    event.target.closest(".confirmacion") ||
    event.target.closest(".recomendar-cancion")
) {
    return;
}


    sobre.classList.toggle("abierto");

    if (sobre.classList.contains("abierto")) {

        musicaFondo.play().catch(function(error) {
            console.log("El navegador bloqueó la reproducción:", error);
        });

    } else {

        musicaFondo.pause();
        musicaFondo.currentTime = 0;
    }
});




// BOTÓN VER UBICACIÓN
botonUbicacion.addEventListener("click", function (event) {

    event.stopPropagation();

    window.open(
        "https://www.google.com/maps/place/Cuarzo+Salon+de+Eventos/@6.2458693,-75.5914601,17z/data=!3m1!4b1!4m6!3m5!1s0x8e4429f8a98d6327:0x5edd3458e1171b7f!8m2!3d6.245864!4d-75.5888852!16s%2Fg%2F11l5x5pqcn?entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D",
        "_blank"
    );
});


// BOTÓN CONFIRMAR ASISTENCIA
botonConfirmar.addEventListener("click", function (event) {

    event.stopPropagation();

    confirmacion.classList.toggle("mostrar");
});


// EVITAR QUE EL FORMULARIO CIERRE EL SOBRE
confirmacion.addEventListener("click", function (event) {

    event.stopPropagation();
});

// ==========================================
// CONFIRMAR ASISTENCIA POR WHATSAPP
// ==========================================

const botonWhatsapp = document.querySelector(".btn-whatsapp");

botonWhatsapp.addEventListener("click", function (event) {

    event.stopPropagation();

    const nombre = document.querySelector(
        '.confirmacion input[placeholder="Tu nombre"]'
    ).value.trim();

    const acompanante = document.querySelector(
        '.confirmacion input[placeholder="Nombre de tu acompañante"]'
    ).value.trim();

    if (nombre === "") {
        alert("Por favor escribe tu nombre.");
        return;
    }

    const acompananteTexto =
        acompanante === ""
            ? "Sin acompañante"
            : acompanante;

    const mensaje =
        "Hola Victoria 💗%0A%0A" +
        "Quiero confirmar mi asistencia a tus XV años.%0A%0A" +
        "Nombre: " + encodeURIComponent(nombre) + "%0A" +
        "Acompañante: " + encodeURIComponent(acompananteTexto);

    window.open(
        "https://wa.me/573184915908?text=" + mensaje,
        "_blank"
    );
});

/* =========================================
   CARRUSEL DE FOTOS
   ========================================= */

const fotosCarrusel = document.querySelectorAll(".foto-carrusel");
const puntosCarrusel = document.querySelectorAll(".punto");

const flechaIzquierda = document.querySelector(".flecha.izquierda");
const flechaDerecha = document.querySelector(".flecha.derecha");

let fotoActual = 0;

function mostrarFoto(numero) {

    fotosCarrusel.forEach((foto) => {
        foto.classList.remove("activa");
    });

    puntosCarrusel.forEach((punto) => {
        punto.classList.remove("activo");
    });

    fotosCarrusel[numero].classList.add("activa");
    puntosCarrusel[numero].classList.add("activo");

    fotoActual = numero;
}


flechaDerecha.addEventListener("click", function(event) {

    event.stopPropagation();

    fotoActual++;

    if (fotoActual >= fotosCarrusel.length) {
        fotoActual = 0;
    }

    mostrarFoto(fotoActual);

});


flechaIzquierda.addEventListener("click", function(event) {

    event.stopPropagation();

    fotoActual--;

    if (fotoActual < 0) {
        fotoActual = fotosCarrusel.length - 1;
    }

    mostrarFoto(fotoActual);

});


/* CAMBIO AUTOMÁTICO */

setInterval(function() {

    fotoActual++;

    if (fotoActual >= fotosCarrusel.length) {
        fotoActual = 0;
    }

    mostrarFoto(fotoActual);

}, 5000);

/* =========================================
   RECOMENDAR CANCIÓN
   ========================================= */

const botonCancion =
    document.querySelector(".btn-cancion");

const recomendarCancion =
    document.querySelector(".recomendar-cancion");


if (botonCancion && recomendarCancion) {

    botonCancion.addEventListener("click", function(event) {

        event.stopPropagation();

        recomendarCancion.classList.toggle("mostrar");

    });


    recomendarCancion.addEventListener("click", function(event) {

        event.stopPropagation();

    });

}
/* =========================================
   CUENTA REGRESIVA XV AÑOS
   18 DE OCTUBRE DE 2026 - 7:00 PM
   ========================================= */

const fechaFiesta = new Date("2026-10-18T19:00:00-05:00").getTime();

const contador = setInterval(function () {

    const ahora = new Date().getTime();

    const diferencia = fechaFiesta - ahora;


    if (diferencia <= 0) {

        clearInterval(contador);

        document.getElementById("dias").textContent = "00";
        document.getElementById("horas").textContent = "00";
        document.getElementById("minutos").textContent = "00";
        document.getElementById("segundos").textContent = "00";

        document.getElementById("mensajeCuenta").textContent =
            "💗 ¡Hoy celebramos mis XV años! 💗";

        return;
    }


    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
    );

    const minutos = Math.floor(
        (diferencia / (1000 * 60)) % 60
    );

    const segundos = Math.floor(
        (diferencia / 1000) % 60
    );


    document.getElementById("dias").textContent =
        String(dias).padStart(2, "0");

    document.getElementById("horas").textContent =
        String(horas).padStart(2, "0");

    document.getElementById("minutos").textContent =
        String(minutos).padStart(2, "0");

    document.getElementById("segundos").textContent =
        String(segundos).padStart(2, "0");

}, 1000);