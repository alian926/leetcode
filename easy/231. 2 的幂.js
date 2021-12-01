/**
 * 
给你一个整数 n，请你判断该整数是否是 2 的幂次方。如果是，返回 true ；否则，返回 false 。

如果存在一个整数 x 使得 n == 2^x ，则认为 n 是 2 的幂次方。

 

示例 1：

输入：n = 1
输出：true
解释：2^0 = 1
示例 2：

输入：n = 16
输出：true
解释：2^4 = 16
示例 3：

输入：n = 3
输出：false
示例 4：

输入：n = 4
输出：true
示例 5：

输入：n = 5
输出：false
 

提示：

-2^31 <= n <= 2^31 - 1

进阶：你能够不使用循环/递归解决此问题吗？
 */

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  if (n === 1) return true;
  if (n % 2 === 1) return false;
  let num = n;
  while (num >= 2) {
    num /= 2;
  }
  return num === 1;
};

// n 的二进制表示中仅包含 1 个 1
var isPowerOfTwo = function (n) {
  return n > 0 && (n & (n - 1)) === 0;
};

// 补码运算
var isPowerOfTwo = function(n) {
  return n > 0 && (n & -n) === n;
};

console.log(isPowerOfTwo(16));
