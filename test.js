// let a = [5, 3, 15, 2, 35, 11];
// let n = a.some((val, idx, obj) => {
//     console.log(`val=${val}, idx=${idx}, obj=${obj}`);
//     return 10<=val;
// });
// console.log(n);




// let a = [11, 3, 10];
// let newsum;
// let sum = 0
// let ace = a.includes(11)
// const atsu = () => {
//     if (ace) {
//         if (sum > 21) {
//             newsum = sum - 10
//             console.log(newsum)
//         }
//     }
// }
// const carcu = () => {
//     for (let i = 0; i < 3; i++) {
//         sum = sum + a[i]
//         atsu()
//     }
// }
// carcu()

const obj = {
    prop1: 'atsu',
    prop2: Math.floor(Math.random() * 4),
    prop3: function(atsu){
        console.log(this.prop4 + atsu)
    },
    prop4: 100,
};

console.log(obj.prop2)
obj.prop3(1)



class randomnum {
    constructor(age){
        this.age = age;
    }
    rand(){
        let i  =Math.floor(Math.random() * 10)
        console.log( i *this.age)  
    }
};
const Num = new randomnum(23)
Num.rand()
const Num2 = new randomnum(23)
Num2.rand()