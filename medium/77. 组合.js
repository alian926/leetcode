/**
 * 
给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

你可以按 任何顺序 返回答案。

 

示例 1：

输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
示例 2：

输入：n = 1, k = 1
输出：[[1]]
 

提示：

1 <= n <= 20
1 <= k <= n

 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const ans = [];
  const dfs = (cur, n, k, temp) => {
    // 剪枝：temp 长度加上区间 [cur, n] 的长度小于 k，不可能构造出长度为 k 的 temp
    if (temp.length + (n - cur + 1) < k) {
      return;
    }
    // 记录合法的答案
    if (temp.length == k) {
      ans.push(temp);
      return;
    }
    // 考虑选择当前位置
    dfs(cur + 1, n, k, [...temp, cur]);
    // 考虑不选择当前位置
    dfs(cur + 1, n, k, temp);
  };
  dfs(1, n, k, []);
  return ans;
};

const combine = (n, k) => {
  // 最后的答案
  const res = [];
  // start是起点，path是路径的数组
  const search = (start, path) => {
      if (path.length === k) {
          // 如果路径长度为k，满足题目要求了
          // 将path推入答案res
          res.push(path.slice());
          return;
      }
      for (let i = start; i <= n; i++) {
          // 每找一个，推入path一个
          path.push(i);
          // 从i+1，接着path继续找
          search(i + 1, path);
          // 上一级找完，path尾巴要拿出来
          path.pop();
      }
  };
  search(1, []);
  return res;
};