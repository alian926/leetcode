/**
 * 
给你两个整数 a 和 b ，不使用 运算符 + 和 - ​​​​​​​，计算并返回两整数之和。

 

示例 1：

输入：a = 1, b = 2
输出：3
示例 2：

输入：a = 2, b = 3
输出：5
 

提示：

-1000 <= a, b <= 1000
 */

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
// 错误解法
// function decimal(n, k) {
//   let ans = 0,
//     i = 0;
//   do {
//     q = Math.floor(n / k);
//     r = n - q * k;
//     ans += r * Math.pow(10, i);
//     i++;
//     n = q;
//   } while (q !== 0);
//   return ans.toString();
// }
// var getSum = function (a, b) {
//   if (a > b) return getSum(b, a);
//   let ba = decimal(a, 2);
//   let bb = decimal(b, 2);
//   let dis = bb.length - ba.length;
//   let rest = bb.substring(0, dis);
//   bb = bb.substring(dis);
//   let ans = [];
//   // 进位
//   let tmp = 0;
//   for (let i = ba.length - 1; i >= 0; i--) {
//     ans.unshift(ba[i] ^ bb[i] ^ tmp);
//     tmp = ba[i] & bb[i] || ba[i] & tmp || bb[i] & tmp;
//   }
//   for (let i = rest.length - 1; i >= 0; i--) {
//     ans.unshift(rest[i] ^ tmp ^ 0);
//     if (rest[i] & tmp) {
//       tmp = 1;
//     } else {
//       tmp = 0;
//     }
//   }
//   tmp && ans.unshift(tmp);
//   return parseInt(ans.join(''), 2);
// };


var getSum = function(a, b) {
    while (b != 0) {
        const carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
};

// console.log(getSum(1, 2)); // 01, 10
// console.log(getSum(2, 3)); // 10, 11,  101
// console.log(getSum(106, 994)); // 10, 11,  101
console.log(getSum(-1, 1)); // 10, 11,  101
