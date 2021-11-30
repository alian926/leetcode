/**
 * 
给定一个三角形 triangle ，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。

 

示例 1：

输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下面简图所示：
   2
  3 4
 6 5 7
4 1 8 3
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
示例 2：

输入：triangle = [[-10]]
输出：-10
 

提示：

1 <= triangle.length <= 200
triangle[0].length == 1
triangle[i].length == triangle[i - 1].length + 1
-104 <= triangle[i][j] <= 104
 

进阶：

你可以只使用 O(n) 的额外空间（n 为三角形的总行数）来解决这个问题吗？
 */

/**
 * @param {number[][]} triangle
 * @return {number}
 */
// 三角形两条边的点 上一步来源只有一种
// n^2空间
var minimumTotal = function (triangle) {
  let n = triangle.length;
  let f = new Array(n).fill(0).map(() => new Array(n).fill(0));
  f[0][0] = triangle[0][0];
  for (let i = 1; i < n; ++i) {
    // 左侧边的点只有一种情况
    f[i][0] = f[i - 1][0] + triangle[i][0];
    for (let j = 1; j < i; ++j) {
      // 中间的点来源可能有两种
      f[i][j] = Math.min(f[i - 1][j - 1], f[i - 1][j]) + triangle[i][j];
    }
    // 右侧边的点只有一种情况
    f[i][i] = f[i - 1][i - 1] + triangle[i][i];
  }
  // 在 n-1行中找到最小的
  let minTotal = f[n - 1][0];
  for (let i = 1; i < n; ++i) {
    minTotal = Math.min(minTotal, f[n - 1][i]);
  }
  return minTotal;
};
// 优化空间, i只与i-1有关,使用两个空间根据奇偶转移状态,反复切换空间记录
var minimumTotal = function (triangle) {
  let n = triangle.length;
  let f = new Array(2).fill(0).map(() => new Array(n).fill(0));
  f[0][0] = triangle[0][0];
  for (let i = 1; i < n; ++i) {
    let curr = i % 2;
    let prev = 1 - curr;
    f[curr][0] = f[prev][0] + triangle[i][0];
    for (let j = 1; j < i; ++j) {
      f[curr][j] = Math.min(f[prev][j - 1], f[prev][j]) + triangle[i][j];
    }
    f[curr][i] = f[prev][i - 1] + triangle[i][i];
  }
  let minTotal = f[(n - 1) % 2][0];
  for (let i = 1; i < n; ++i) {
    minTotal = Math.min(minTotal, f[(n - 1) % 2][i]);
  }
  return minTotal;
};
// j通过递减的方式进行遍历, 可以再次节约空间
var minimumTotal = function (triangle) {
  // 行数
  let n = triangle.length;
  let f = [];
  f[0] = triangle[0][0];
  for (let i = 1; i < n; ++i) {
    f[i] = f[i - 1] + triangle[i][i];
    for (let j = i - 1; j > 0; --j) {
      f[j] = Math.min(f[j - 1], f[j]) + triangle[i][j];
    }
    f[0] += triangle[i][0];
  }
  let minTotal = f[0];
  for (let i = 1; i < n; ++i) {
    minTotal = Math.min(minTotal, f[i]);
  }
  return minTotal;
};

const minimumTotal = (triangle) => {
  const bottom = triangle[triangle.length - 1];
  // 录入最后一列数据
  const dp = [...bottom];
  // 从倒数第二列开始迭代
  for (let i = dp.length - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      // 从下往上整合数据
      dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j];
    }
  }
  return dp[0];
};
