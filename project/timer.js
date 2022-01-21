let [hour, day, month, year] = process.argv.splice(2, 4);
const EventEmitter = require('events');
const emitter = new EventEmitter;

const timerDate = new Date(Date.UTC(year, --month, day, hour));
const currentDate = new Date();
currentDate.setHours(currentDate.getHours() + 3);
let difference = timerDate - currentDate;

function timer() {
    console.clear();
    if (difference > 0) {
        emitter.emit('tick');
    } else {
        emitter.emit('endTimer');
    }
}

function tick(){
    let countDay = Math.floor(difference / (24 * 60 * 60 * 1000));
    let countHours = Math.floor((difference / (60 * 60 * 1000)) - (countDay * 24));
    let countMinutes = Math.floor((difference / (60 * 1000)) - (countDay * 24 * 60 + countHours * 60));
    let countSeconds = Math.floor((difference / 1000) - (countDay * 24 * 60 * 60 + countHours * 60 * 60 + countMinutes * 60));
    console.log(`Осталось ${countDay}:${countHours}:${countMinutes}:${countSeconds}`);
    difference -= 1000;
}

function endTimer(){
    console.log('Время вышло!');
    clearInterval(idInterval);
}

emitter.on('tick', tick);
emitter.on('endTimer', endTimer);

idInterval = setInterval(timer, 1000);