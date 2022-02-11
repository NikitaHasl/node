let [hour, day, month, year] = process.argv.splice(2, 4);
let idInterval = 0;

//Подключаем пакет для работы с событиями.
const EventEmitter = require('events');
const emitter = new EventEmitter;

const timerDate = new Date(Date.UTC(year, --month, day, hour));
const currentDate = getCurrentDateNow();
let differenceInTime = timerDate - currentDate;//Разница в миллисекундах между текущей датой и установленной таймером.

emitter.on('validate', validation);
emitter.on('start', start);
emitter.on('tick', tick);
emitter.on('endTimer', endTimer);

emitter.emit('validate');

/**
 * Проверяет, что введенное значение даты и времени корректные и находится в будущем времени. Если все ок, запускает
 * таймер.
 */
function validation() {
    if (hour < 0 || hour > 24 || day < 0 || day > 31 || month < 0 || month > 12 || year < 0 || isNaN(differenceInTime)) {
        console.log('Вы ввели некорректную дату и время!');
    } else if (differenceInTime < 0) {
        console.log('Дата таймера должна быть в будущем времени.');
    } else {
        emitter.emit('start');
    }
}

/**
 * Вычисляем корректное время с учётом часового пояса.
 * @return {number} Кол-во миллисекунд, прошедших с 1.1.1970
 */
function getCurrentDateNow() {
    let date = new Date();
    let timezoneOffset = date.getTimezoneOffset();
    timezoneOffset = -timezoneOffset * 60 * 1000;
    return date.valueOf() + timezoneOffset;
}

/**
 * Запускает таймер.
 */
function start() {
    idInterval = setInterval(timer, 1000);
}

/**
 *  Основная функция, отсчитывает и выводит время таймера и завершает его, когда время истекло.
 */
function timer() {
    console.clear();
    if (differenceInTime > 0) {
        emitter.emit('tick');
    } else {
        emitter.emit('endTimer');
    }
}

/**
 * Высчитывает и выводит сколько осталось времени до конца таймера.
 */
function tick() {
    let countDay = Math.floor(differenceInTime / (24 * 60 * 60 * 1000));
    let countHours = Math.floor((differenceInTime / (60 * 60 * 1000)) - (countDay * 24));
    let countMinutes = Math.floor((differenceInTime / (60 * 1000)) - (countDay * 24 * 60 + countHours * 60));
    let countSeconds = Math.floor((differenceInTime / 1000) - (countDay * 24 * 60 * 60 + countHours * 60 * 60 + countMinutes * 60));
    console.log(`Осталось ${countDay}:${countHours}:${countMinutes}:${countSeconds}`);
    differenceInTime -= 1000;
}

/**
 * Функция останавливает таймер и выводит сообщение, что время вышло.
 */
function endTimer() {
    console.log('Время вышло!');
    clearInterval(idInterval);
}



