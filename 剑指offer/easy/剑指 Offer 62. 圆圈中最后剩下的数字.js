/**
 * 
0,1,···,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字（删除后从下一个数字开始计数）。求出这个圆圈里剩下的最后一个数字。

例如，0、1、2、3、4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。

 

示例 1：

输入: n = 5, m = 3
输出: 3
示例 2：

输入: n = 10, m = 17
输出: 2
 

限制：

1 <= n <= 10^5
1 <= m <= 10^6

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
// 暴力解法 超时了
var lastRemaining = function (n, m) {
    let start = 0;
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(i);
    }
    while (arr.length > 1) {
        let remove = (((m - 1) % arr.length) + start) % arr.length;
        let v = arr.splice(remove, 1);
        start = remove;
    }
    return arr[0];
};

// 数学 递归
var lastRemaining = function (n, m) {
    const d = function (n, m) {
        if (n == 1) {
            return 0;
        }
        // 下一轮起点
        var x = d(n - 1, m);
        // f(n, m) = (m % n + x) % n = (m + x) % n
        return (m + x) % n;
    };
    return d(n, m);
};

// 将上面的递归改写成迭代
var lastRemaining = function (n, m) {
    let f = 0;
    for (let i = 2; i != n + 1; ++i) {
        f = (m + f) % i;
    }
    return f;
};

console.log(lastRemaining(5, 3)); // 3, 依次移除 2、0、4、1，
console.log(lastRemaining(10, 17)); // 2
console.log(lastRemaining(82002, 120659)); // 9966
