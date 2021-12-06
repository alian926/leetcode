/**
 * 
你的任务是计算 ab 对 1337 取模，a 是一个正整数，b 是一个非常大的正整数且会以数组形式给出。

 

示例 1：

输入：a = 2, b = [3]
输出：8
示例 2：

输入：a = 2, b = [1,0]
输出：1024
示例 3：

输入：a = 1, b = [4,3,3,8,5,2]
输出：1
示例 4：

输入：a = 2147483647, b = [2,0,0]
输出：1198
 

提示：

1 <= a <= 231 - 1
1 <= b.length <= 2000
0 <= b[i] <= 9
b 不含前导 0
 */

/**
 * @param {number} a
 * @param {number[]} b
 * @return {number}
 */
const MOD = BigInt(1337);

var superPow = function (a, b) {
  let ans = 1;
  for (const e of b) {
    ans = (pow(BigInt(ans), 10) * pow(BigInt(a), e)) % MOD;
  }
  return ans;
};

const pow = (x, n) => {
  let res = BigInt(1);
  while (n !== 0) {
    if (n % 2 !== 0) {
      res = (res * BigInt(x)) % MOD;
    }
    x = (x * x) % MOD;
    n = Math.floor(n / 2);
  }
  return res;
};
