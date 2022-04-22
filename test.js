// let a = [5, 3, 15, 2, 35, 11];
// let n = a.some((val, idx, obj) => {
//     console.log(`val=${val}, idx=${idx}, obj=${obj}`);
//     return 10<=val;
// });
// console.log(n);




let a = [11, 3, 10];
let newsum
let sum = 0
let ace = a.includes(11)
const atsu = () => {
    if (ace) {
        if (sum > 21) {
            newsum = sum - 10
            console.log(newsum)
        }
    }
}
const carcu = () => {
    for (let i = 0; i < 3; i++) {
        sum = sum + a[i]
        atsu()
    }
}
carcu()