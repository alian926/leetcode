/**
 * 
泰波那契序列 Tn 定义如下： 

T0 = 0, T1 = 1, T2 = 1, 且在 n >= 0 的条件下 Tn+3 = Tn + Tn+1 + Tn+2

给你整数 n，请返回第 n 个泰波那契数 Tn 的值。

 

示例 1：

输入：n = 4
输出：4
解释：
T_3 = 0 + 1 + 1 = 2
T_4 = 1 + 1 + 2 = 4
示例 2：

输入：n = 25
输出：1389537
 

提示：

0 <= n <= 37
答案保证是一个 32 位整数，即 answer <= 2^31 - 1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/n-th-tribonacci-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number} n
 * @return {number}
 */

// 超时了
var tribonacci = function (n) {
    const ans = [0, 1, 1];
    if (n < 3) {
        return ans[n];
    }
    return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
};


var tribonacci = function (n) {
    const ans = [0, 1, 1];
    const inner = x => {
        if(x in ans) {
            return ans[x]
        }
        let t = inner(x - 1) + inner(x - 2) + inner(x - 3);
        ans[x]= t;
        return t
    }
    return inner(n);
};

var tribonacci = function (n) {
    const ans = new Map([[0,0], [1,1], [2,1]]);
    const inner = x => {
        if(ans.has(x)) {
            return ans.get(x)
        }
        let t = inner(x - 1) + inner(x - 2) + inner(x - 3);
        ans.set(x,t);
        return t
    }
    return inner(n);
};

