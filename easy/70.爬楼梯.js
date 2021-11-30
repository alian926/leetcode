/** 
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

示例 1：

输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶
示例 2：

输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶

*/

/**
 * @param {number} n
 * @return {number}
 */

//回溯方法, 超时了, 不合理
var climbStairs = function (n) {
  if (!n) return 0;
  let res = 0;
  let dfs = function (n) {
    if (n <= 1) {
      return (res += 1);
    }
    for (let i = 1; i <= 2; i++) {
      dfs(n - i);
    }
  };
  dfs(n);
  return res;
};

//动态规划, 爬山n阶楼梯, 等于n-1 加上n-2的两种情况和
var climbStairs = function (n) {
  //最简单情况
  let dn = [1, 1];
  //找出 n时的各种情况的结果
  for (let i = 2; i <= n; i++) {
    dn.push(dn[i - 1] + dn[i - 2]);
  }
  return dn[n];
};
