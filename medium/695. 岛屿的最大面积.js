/**
 * 
给你一个大小为 m x n 的二进制矩阵 grid 。

岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。

岛屿的面积是岛上值为 1 的单元格的数目。

计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。

 

示例 1：


输入：grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
输出：6
解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
示例 2：

输入：grid = [[0,0,0,0,0,0,0,0]]
输出：0
 

提示：

m == grid.length
n == grid[i].length
1 <= m, n <= 50
grid[i][j] 为 0 或 1

 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  const walked = new Set();
  let ans = 0;
  let [row, col] = [0, -1];
  let [h, w] = [grid.length, grid[0]?.length || 0];
  const dis = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const queue = [];
  var isLand = function (sr, sc, val = 1) {
    // 去除重复节点
    if (sr >= 0 && sc >= 0 && sr < h && sc < w) {
      return grid[sr][sc] === val;
    }
    return false;
  };
  while (row < h) {
    col++;
    if (col >= w) {
      row++;
      col = 0;
    }
    if (walked.has(`${row},${col}`)) continue;
    walked.add(`${row},${col}`);
    if (isLand(row, col)) {
      queue.push([row, col]);
    }
    let tmp = 0;
    while (queue.length) {
      tmp += 1;
      let point = queue.shift();
      for (let d of dis) {
        let r = point[0] + d[0],
          c = point[1] + d[1];
        if (!walked.has(`${r},${c}`) && isLand(r, c)) {
          walked.add(`${r},${c}`);
          queue.push([r, c]);
        }
      }
    }
    ans = Math.max(tmp, ans);
  }
  return ans;
};

// 不采用 记录的方式,  将访问过的1置0
var maxAreaOfIsland = function (grid) {
  let ans = 0;
  let [row, col] = [0, -1];
  let [h, w] = [grid.length, grid[0]?.length || 0];
  const dis = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const queue = [];
  var isLand = function (sr, sc, val = 1) {
    // 去除重复节点
    if (sr >= 0 && sc >= 0 && sr < h && sc < w) {
      if (grid[sr][sc] === val) {
        grid[sr][sc] = 0;
        queue.push([sr, sc]);
        return true;
      }
    }
    return false;
  };
  while (row < h) {
    col++;
    if (col >= w) {
      row++;
      col = -1;
      continue;
    }
    if (!isLand(row, col)) {
      continue;
    }
    let tmp = 0;
    while (queue.length) {
      tmp += 1;
      let point = queue.shift();
      for (let d of dis) {
        let [r, c] = [point[0] + d[0], point[1] + d[1]];
        isLand(r, c);
      }
    }
    ans = Math.max(tmp, ans);
  }
  return ans;
};

// 不采用 记录的方式,  将访问过的1置0, 递归
var maxAreaOfIsland = function (grid) {
  let ans = 0;
  let [h, w] = [grid.length, grid[0]?.length || 0];
  const dis = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  var isLand = function (sr, sc, val = 1) {
    // 去除重复节点
    if (sr >= 0 && sc >= 0 && sr < h && sc < w) {
      if (grid[sr][sc] === val) {
        grid[sr][sc] = 0;
        return true;
      }
    }
    return false;
  };
  var getArea = function (row, col) {
    if (!isLand(row, col)) return 0;
    let ans = 1;
    for (let d of dis) {
      let [r, c] = [row + d[0], col + d[1]];
      ans += getArea(r, c);
    }
    return ans;
  };
  for (let row = 0; row < h; row++) {
    for (let col = 0; col < w; col++) {
      ans = Math.max(getArea(row, col), ans);
    }
  }
  return ans;
};

console.log(
  maxAreaOfIsland([
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ])
);
