// Задача №1 Функция конвертации скоростей

// const k = 5/18
// function speedConverterToKMH(speed) {
//     return `${speed} км/ч соответствует ${speed*k} м/с`
// }

// function speedConverterToMS(speed) {
//     return `${speed} м/с соответствует ${speed/k} км/ч`
// }

// function convertSpeed(a, b) {
//     let ans = "Error"
//     if (b == 'toMS') {
//         ans = speedConverterToMS(a)
//     } else if (b == 'toKMH') {
//         ans = speedConverterToKMH(a)
//     }
//     return ans
// }

// console.log(convertSpeed(36, 'toMS'))
// console.log(convertSpeed(36, 'toKMH'))



//Задача №2 Абсолютное значение

// function myAbs(x) {
//     return x >= 0 ? x : -x
// }

// console.log(myAbs(-5))
// console.log(myAbs(5))
// console.log(myAbs(0))



// Задача №3 Работа с объектом

// function Student(group, last_name, first_name) {
//     this.getInfo = function() {
//         console.log(`Студент ${this.name} ${this.last_name} учиться в группе ${this.group}`)
//     }
//     this.name = first_name
//     this.last_name = last_name
//     this.group = group
// }

// let exp = new Student("211-325", "Natur", "Mustafa")

// exp.getInfo()



// Задача №4 Случайные числа

// function getRandom(min, max) {
//     return Math.round(Math.random() * (max - min) + min)
// }

// console.log(getRandom(54, 65))



// function getRandomArray(arr, a) {
//     let newArr = []
//     while (a) {
//         newArr.push(arr[getRandom(0, arr.length - 1)])
//         a-=1
//     }
//     return newArr
// }

// console.log(getRandomArray([1,2,3,4,5], getRandom(2, 5)))
