let hours;
let minutes;
let seconds;
let cron;
let miliseconds;

const alarm = new Audio('./alarm.mp3')

document.addEventListener('keypress', (event) => {
    if (event.key === 'i' || event.key === 'I') {
        check()
    }
    if (event.key === 'p' || event.key === 'P') {
            pause()
        }
})

function check() {
    let toggle = document.querySelector('.toggle').innerHTML;
    if (toggle == 'Iniciar') {
        document.querySelector('.toggle').innerHTML = 'Pausar';
        start();
    } else {
        document.querySelector('.toggle').innerHTML = 'Iniciar';
        pause();
    }
}

function start() {
    miliseconds = convertToMls();
    cron = setInterval(() => {timer()}, 1000);
    document.querySelector('.toggle').innerHTML = 'Pausar';
}

function pause() {
    clearInterval(cron)
    document.querySelector('.toggle').innerHTML = 'Iniciar';
}

function stop() {
    clearInterval(cron);
    document.querySelector('.second').value = '';
    document.querySelector('.minute').value = '';
    document.querySelector('.hour').value = '';
    document.querySelector('.toggle').innerHTML = 'Iniciar';
}

function timer() {
    if (miliseconds > 0) {
        miliseconds -= 1000
    } 

    hours = parseInt(miliseconds / 3600000);
    minutes = parseInt((miliseconds - 3600000*hours) / 60000);
    seconds = parseInt((miliseconds - (60000*minutes + 3600000*hours)) / 1000);

    document.querySelector('.hour').value = `${hours > 9 ? hours : '0'+hours}`;
    document.querySelector('.minute').value = `${minutes > 9 ? minutes : '0'+minutes}`;
    document.querySelector('.second').value = `${seconds > 9 ? seconds : '0'+seconds}`;

    if (miliseconds == 0) {
        stop();
        alarm.play();
        alert("O timer foi zerado!");
        alarm.pause();
        alarm.currentTime = 0;
        document.querySelector('.toggle').innerHTML = 'Iniciar';
    }
}

function convertToMls(){
    let smls = document.querySelector('.second').value * 1000;
    let mmls = document.querySelector('.minute').value * 60000;
    let hmls = document.querySelector('.hour').value * 3600000;

    let mls = smls + mmls + hmls;

    return mls
}