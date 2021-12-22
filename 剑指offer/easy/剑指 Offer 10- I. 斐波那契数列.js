/**
 * 
写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：

F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

 

示例 1：

输入：n = 2
输出：1
示例 2：

输入：n = 5
输出：5
 

提示：

0 <= n <= 100
 */

/**
 * @param {number} n
 * @return {number}
 */
var fib = (function () {
    // 注意, 直接使用 number类型会越界, 需要使用BigInt
    const result = [0n, 1n];
    const MOD = 1000000007n;
    const inner = n => {
        if (n > result.length - 1) {
            for (let i = result.length; i <= n; i++) {
                result[i] = result[i - 1] + result[i - 2];
            }
        }
        return Number(result[n] % MOD);
    };
    return inner;
})();

var fib = function (n) {
    const MOD = 1000000007;
    if (n < 2) {
        return n;
    }
    let p = 0,
        q = 0,
        r = 1;
    for (let i = 2; i <= n; ++i) {
        p = q;
        q = r;
        r = (p + q) % MOD;
    }
    return r;
};

var fib = function (n) {
    const result = [0, 1];
    const MOD = 1000000007;
    const inner = n => {
        if (n > result.length - 1) {
            for (let i = result.length; i <= n; i++) {
                result[i] = (result[i - 1] + result[i - 2]) % MOD;
            }
        }
        return result[n];
    };
    return inner(n);
};

console.log(fib(2));
console.log(fib(3)); // 2
console.log(fib(45)); // 134903163
console.log(fib(81)); // 107920472
