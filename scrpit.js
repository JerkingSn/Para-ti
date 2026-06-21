// Fecha del cumpleaños: 29 de junio
const FECHA_TARGET = new Date("June 29, 2026 00:00:00").getTime();

function actualizarContador() {
    const ahora = new Date().getTime();
    const distancia = FECHA_TARGET - ahora;

    if (distancia < 0) {
        document.getElementById("dias").innerText = "00";
        document.getElementById("horas").innerText = "00";
        document.getElementById("minutos").innerText = "00";
        document.getElementById("segundos").innerText = "00";
        if (document.querySelector(".contador-tag")) {
            document.querySelector(".contador-tag").innerText = "¡Llegó el gran día! ¡Feliz Cumpleaños! 🎉🥳";
        }
        return;
    }

    // Cálculos de tiempo
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Colocar los números en el HTML
    if (document.getElementById("dias")) document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
    if (document.getElementById("horas")) document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
    if (document.getElementById("minutos")) document.getElementById("minutos").innerText = minutos < 10 ? "0" + minutos : minutos;
    if (document.getElementById("segundos")) document.getElementById("segundos").innerText = segundos < 10 ? "0" + segundos : segundos;
}

// Ejecutar el contador cada segundo
actualizarContador();
setInterval(actualizarContador, 1000);


// ==========================================
// LÓGICA DEL CARRUSEL DE RECUERDOS
// ==========================================
const track = document.getElementById('carruselTrack');
const btnIzq = document.getElementById('btnIzq');
const btnDer = document.getElementById('btnDer');

let indexActual = 0;
const tarjetaAncho = 345; // Ancho de la tarjeta (320px) + el gap (25px)

if (track && btnIzq && btnDer) {
    btnDer.addEventListener('click', () => {
        const maxItems = track.children.length;
        const itemsVisibles = window.innerWidth > 960 ? 3 : 1;

        if (indexActual < maxItems - itemsVisibles) { 
            indexActual++;
            track.style.transform = `translateX(-${indexActual * tarjetaAncho}px)`;
        } else {
            indexActual = 0; // Resetea de forma cíclica al inicio
            track.style.transform = `translateX(0px)`;
        }
    });

    btnIzq.addEventListener('click', () => {
        const maxItems = track.children.length;
        const itemsVisibles = window.innerWidth > 960 ? 3 : 1;

        if (indexActual > 0) {
            indexActual--;
            track.style.transform = `translateX(-${indexActual * tarjetaAncho}px)`;
        } else {
            indexActual = maxItems - itemsVisibles; // Va al final si retroceden desde el inicio
            track.style.transform = `translateX(-${indexActual * tarjetaAncho}px)`;
        }
    });
}


// ==========================================
// CONTROL REAL DEL MINI REPRODUCTOR FLOTANTE
// ==========================================
const audio = document.getElementById('musicaFondo');
const btnPlayPause = document.getElementById('btnPlayPause');
const iconPlay = document.getElementById('icon-play');
const cover = document.querySelector('.player-cover');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');

if (audio && btnPlayPause) {
    // Alternar entre reproducir y pausar con el botón flotante
    btnPlayPause.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita conflictos con clics globales
        if (audio.paused) {
            audio.play();
            iconPlay.classList.replace('fa-play', 'fa-pause');
            if (cover) cover.style.animationPlayState = 'running';
        } else {
            audio.pause();
            iconPlay.classList.replace('fa-pause', 'fa-play');
            if (cover) cover.style.animationPlayState = 'paused';
        }
    });

    // Sincronizar la barra de progreso rosa con el tiempo de la canción
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const porcentaje = (audio.currentTime / audio.duration) * 100;
            if (progressBar) progressBar.style.width = `${porcentaje}%`;
        }
    });

    // Permitir hacer clic en la barrita para adelantar o atrasar la música
    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            const anchoContenedor = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duracionTotal = audio.duration;
            
            if (duracionTotal) {
                audio.currentTime = (clickX / anchoContenedor) * duracionTotal;
            }
        });
    }
    
    // Intento de reproducción automática al interactuar por primera vez con el sitio
    const iniciarConInteraccion = () => {
        audio.play().then(() => {
            if (iconPlay) iconPlay.classList.replace('fa-play', 'fa-pause');
            if (cover) cover.style.animationPlayState = 'running';
            // Quitamos el detector una vez que arranca con éxito
            document.removeEventListener('click', iniciarConInteraccion);
        }).catch(() => {
            // Se queda esperando de forma silenciosa si el navegador aún bloquea el audio
        });
    };
    
    document.addEventListener('click', iniciarConInteraccion);
}
