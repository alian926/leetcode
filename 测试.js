//利用了函数的柯里化和闭包特性
// function add(...arg) {
//     let a = arg;
//     let _add = function (...innerArg) {
//         console.log(3,a)
//         console.log(5,innerArg)
//       if (innerArg.length === 0) {
//         return a.reduce(function (a, b) { return a + b })
//       } else {
//         [].push.apply(a, innerArg)
//         return _add;
//       }
//     }
//     return _add
//   }
  
//   add(1)(2)(3)()    // 6

function add(x) {
    var sum = x;
    var tmp = function (y) {
        sum = sum + y;
        return tmp;
    };
    tmp.toString = function () {
        return sum;
    };
    return tmp;
}
console.log(add(1)(2)(3)); //6

// var add = function (m) {
 
//     var temp = function (n) {
//         return add(m + n);
//     }
 
//     temp.toString = function () {
//         return m;
//     }
 
//     return temp;
// };
 
 
// console.log(46,add(3)(4)(5)); // 12