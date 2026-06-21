const audio = document.getElementById('audio');
const btnPlayPause = document.getElementById('btnPlayPause');
const iconPlay = document.getElementById('icon-play');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const track = document.getElementById('carruselTrack');
const btnIzq = document.getElementById('btnIzq');
const btnDer = document.getElementById('btnDer');

// Reproducción
btnPlayPause.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        iconPlay.className = 'fas fa-pause';
    } else {
        audio.pause();
        iconPlay.className = 'fas fa-play';
    }
});

// Barra de progreso
audio.addEventListener('timeupdate', () => {
    progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
});

// Carrusel
let index = 0;
btnDer.addEventListener('click', () => {
    index = (index < track.children.length - 1) ? index + 1 : 0;
    track.style.transform = `translateX(-${index * 100}%)`;
});
btnIzq.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : track.children.length - 1;
    track.style.transform = `translateX(-${index * 100}%)`;
});
