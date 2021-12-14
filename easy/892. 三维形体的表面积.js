/**
 * 
 给你一个 n * n 的网格 grid ，上面放置着一些 1 x 1 x 1 的正方体。

每个值 v = grid[i][j] 表示 v 个正方体叠放在对应单元格 (i, j) 上。

放置好正方体后，任何直接相邻的正方体都会互相粘在一起，形成一些不规则的三维形体。

请你返回最终这些形体的总表面积。

注意：每个形体的底面也需要计入表面积中。

 

示例 1：


输入：grid = [[2]]
输出：10
示例 2：


输入：grid = [[1,2],[3,4]]
输出：34
示例 3：


输入：grid = [[1,0],[0,2]]
输出：16
示例 4：


输入：grid = [[1,1,1],[1,0,1],[1,1,1]]
输出：32
示例 5：


输入：grid = [[2,2,2],[2,1,2],[2,2,2]]
输出：46
 

提示：

n == n
n == grid[i].length
1 <= n <= 50
0 <= grid[i][j] <= 50
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var surfaceArea = function (grid) {
  let n = grid.length;
  let disX = [0, 0, 1, -1];
  let disY = [1, -1, 0, 0];
  let total = 0;
  const near = (i, j) => {
    for (let z = 0; z < 4; z++) {
      let oi = i + disX[z];
      let oj = j + disY[z];
      if (grid[oi]?.[oj] > 0) {
        total -= Math.min(grid[i][j], grid[oi][oj]) * 2;
      }
    }
    grid[i][j] = 0;
  };
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] > 0) {
        total += grid[i][j] * 6 - (grid[i][j] - 1) * 2;
        near(i, j);
      }
    }
  }
  return total;
};

var surfaceArea = function (grid) {
  let n = grid.length;
  let disX = [0, 0, 1, -1];
  let disY = [1, -1, 0, 0];
  let total = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] > 0) {
        total += grid[i][j] * 6 - (grid[i][j] - 1) * 2;
        for (let z = 0; z < 4; z++) {
          let oi = i + disX[z];
          let oj = j + disY[z];
          if (grid[oi]?.[oj] > 0) {
            total -= Math.min(grid[i][j], grid[oi][oj]) * 2;
          }
        }
        grid[i][j] = 0;
      }
    }
  }
  return total;
};

var surfaceArea = function (grid) {
  let n = grid.length;
  let disX = [0, 1];
  let disY = [1, 0];
  let total = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] > 0) {
        total += grid[i][j] * 6 - (grid[i][j] - 1) * 2;
        for (let z = 0; z < 2; z++) {
          let oi = i + disX[z];
          let oj = j + disY[z];
          if (grid[oi]?.[oj] > 0) {
            total -= Math.min(grid[i][j], grid[oi][oj]) * 2;
          }
        }
        grid[i][j] = 0;
      }
    }
  }
  return total;
};

console.log(surfaceArea([[2]])); // 10
console.log(
  surfaceArea([
    [1, 2],
    [3, 4],
  ])
); // 34
console.log(
  surfaceArea([
    [1, 0],
    [0, 2],
  ])
); // 16
console.log(
  surfaceArea([
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ])
); // 32
console.log(
  surfaceArea([
    [1, 2],
    [3, 4],
  ])
); // 34
