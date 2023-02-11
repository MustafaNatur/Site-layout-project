// // Задача №1 Конвертация скоростей

// const k = 5/18
// function speedConverterToKMH(speed) {
//     return `${speed} км/ч соответствует ${speed*k} м/с`
// }

// function speedConverterToMS(speed) {
//     return `${speed} м/с соответствует ${speed/k} км/ч`
// }

// let speed = 0

// speed = 36
// console.log(`${speedConverterToKMH(speed)}`)

// speed = 20
// console.log(`${speedConverterToMS(speed)}`)


// // Задача №2 Треугольник

// let a = 12
// let b = 5
// let c = 5

// function isPossible(a, b, c) {
//     return (a < b + c && c < a + b && b < a + c)
// }

// function getPerimeter(a, b, c) {
//     return a + b + c
// }

// function getSquare(a, b, c) {
//     let p = getPerimeter(a, b, c) / 2
//     return Math.sqrt(p * (p - a) * (p - b) * (p - c))
// }

// function solution(a, b, c) {
//     let s = 0
//     let p = 0
//     if (isPossible(a, b, c)) {
//         p = getPerimeter(a, b, c)
//         s = getSquare(a, b, c)
//         console.log(`периметр = ${p}`)
//         console.log(`площадь = ${s}`)
//         console.log(`Соотношение = ${p / s}`)
//     } else {
//         console.log("треугольника не существует")
//     }
// }

// solution(a, b ,c)


// // Задача №3 Fizz-Buzz

// function suffix(a) {
//     let ans = "buzz"
//     if (a % 5 == 0 && a != 0) {
//        ans = "fizz buzz"
//     } else if (a % 2 == 0) {
//         ans = "buzz"
//     } else {
//         ans = "fizz"
//     }
//     return ans
// }

// function solution_2() {
    
//     let a = Number(prompt())
//     if (a !== null && !isNaN(a)) {
//         for (let i = 0; i <= a; i++) {
//             console.log(`${i} ` + suffix(i))
//         }
//     } else {
//         console.log("Input error")
//     }
// }

// solution_2()
// //Задача №4 Елка к новому году
// function buidTree(a) {
//     let resString = "^\n"
//     let c = "*"
//     for (let i = 0; i < a; i++) {
//         c = i % 2 ? "#":"*"
//         resString += c.repeat(i + 1)
//         resString+="\n"
//     }
//     resString+="||"
//     console.log(resString)
// }

// buidTree(12)


// //Задача №5 Угадай число

// let key = 5
// let f = 0
//  do {
//     f = Number(prompt())
//     if (f < key) {
//         console.log("ваше число меньше")
//     } else if(f > key) {
//         console.log("ваше число больше")
//     } else {
//         console.log("угадано")
//     }
// } while ( f!= key)

// Задача №6 Деление
// let n = Number(prompt())
// let x = Number(prompt())
// let y = Number(prompt())
// console.log(`n =   ${n}, x = ${x}, y = ${y} => ${!(n % x) && !(n % y)}`)


// for (let month = 1; month <= 12; month++) {
//     console.log(`месяц ${month} => ${(month - month % 3) / 3 + ((month % 3)!=0 ? 1 : 0)} квартал`)
// }








