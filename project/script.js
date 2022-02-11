/**
 * Класс Num находит простые числа в переданном диапазоне и выводит их в консоль в разных цветах.
 *
 * @type {number} startRange Начало диапазона.
 * @type {number} endRange Окончание диапазона.
 * @type {Function} colors Библиотека для окрашивания чисел в консоли.
 * @type {object} currentColor Текущий цвет числа, имеет значения green, yellow, red.
 */
class Num {
    #startRange = 0;
    #endRange = 0;
    #colors = require('colors');
    #currentColor = this.#colors.green;
    constructor(startRange, endRange) {
        this.#startRange = startRange;
        this.#endRange = endRange;

        this.#validateRange();
        this.#findSimpleNumbers();
    }

    /**
     * Метод проверяет значения диапазона. Это должны быть числа, больше 0, начало диапазона меньше чем окончание.
     * Если диапазон не подходит под условие, будет выброшена ошибка.
     * @throws {Error}
     */
    #validateRange(){
        if (!parseInt(this.#startRange) || !parseInt(this.#endRange) || this.#startRange >= this.#endRange || this.#endRange <= 0){
            throw new Error('Переданы некорректные значения');
        }

        if (this.#startRange < 2){
            this.#startRange = 2;
        }
    }

    /**
     * Метод нахождения простого числа. Перебираем числа и проверяем, чтобы оно делилось только на себя или на 1.
     *
     */
    #findSimpleNumbers(){
        for (let i = this.#startRange; i <= this.#endRange; i++){
            let simpleNumber = true;
            for (let j = this.#startRange; j*j < i && simpleNumber; j++){
                if ((i % 2 === 0 && i !== 2) || i % j === 0){
                    simpleNumber = false;
                }
            }
            if (simpleNumber){
                this.#displayNumber(i);
            }
        }
    }

    /**
     * Выводит число в консоль нужным цветом.
     * @param number Простое число, которое нужно вывести.
     */
    #displayNumber(number){
        console.log(this.#currentColor(number));
        this.#nextColorOfNumber();
    }

    /**
     * Меняет текущий цвет чисел.
     */
    #nextColorOfNumber(){
        let [ color ] = this.#currentColor._styles;
        switch (color){
            case 'green':
                this.#currentColor = this.#colors.yellow;
                break;
            case 'yellow':
                this.#currentColor = this.#colors.red;
                break;
            case 'red':
                this.#currentColor = this.#colors.green;
                break;
        }
    }
}

const [ start, end ] = process.argv.splice(2, 2);
new Num(start, end);