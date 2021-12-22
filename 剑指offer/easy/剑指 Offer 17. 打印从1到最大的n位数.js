/**
 * 
输入数字 n，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。

示例 1:

输入: n = 1
输出: [1,2,3,4,5,6,7,8,9]
 

说明：

用返回一个整数列表来代替打印
n 为正整数

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number} n
 * @return {number[]}
 */
var printNumbers = function (n) {
    const ans = [];
    for (let i = 1; i < Math.pow(10, n); i++) {
        ans.push(i);
    }
    return ans;
};

// solution 2: using string to solve this problem for BigInt
var printNumbers = function (n) {
    let max = '';
    while (n--) {
        // will get the maxNumber of string type -> '9'/'99'/'999'/'9..9' -> this will avoid the bigInt issue
        max += '9';
    }

    for (let i = 1, l = +max; i <= l; i++) res.push(i);
};

// 位操作
var printNumbers = function (n) {
    let max = 1,
        x = 10;
    while (n) {
        if (n & 1) {
            max = max * x;
        }
        x *= x;
        n >>= 1;
    }
    let res = [];
    for (let i = 1; i < max; i++) {
        res.push(i);
    }
    return res;
};

// dfs
var printNumbers = function (n) {
    let res = [];

    // strNum 通过字符串形式表示的数字, 
    var dfs = function (strNum, lengthOfNum) {
        if (strNum.length == lengthOfNum) {
            res.push(+strNum);
            return;
        }
        for (let i = 0; i <= 9; i++) {
            dfs(strNum + i.toString(), lengthOfNum);
        }
    };

    for (let m = 1; m <= n; m++) {
        // 首数不包括0
        for (let i = 1; i <= 9; i++) {
            dfs(i.toString(), m);
        }
    }

    return res;
};

console.log(printNumbers(2));
