/**
 * 
「以扣会友」线下活动所在场地由若干主题空间与走廊组成，场地的地图记作由一维字符串型数组 grid，字符串中仅包含 "0"～"5" 这 6 个字符。地图上每一个字符代表面积为 1 的区域，其中 "0" 表示走廊，其他字符表示主题空间。相同且连续（连续指上、下、左、右四个方向连接）的字符组成同一个主题空间。

假如整个 grid 区域的外侧均为走廊。请问，不与走廊直接相邻的主题空间的最大面积是多少？如果不存在这样的空间请返回 0。

示例 1:

输入：grid = ["110","231","221"]

输出：1

解释：4 个主题空间中，只有 1 个不与走廊相邻，面积为 1。


示例 2:

输入：grid = ["11111100000","21243101111","21224101221","11111101111"]

输出：3

解释：8 个主题空间中，有 5 个不与走廊相邻，面积分别为 3、1、1、1、2，最大面积为 3。


提示：

1 <= grid.length <= 500
1 <= grid[i].length <= 500
grid[i][j] 仅可能是 "0"～"5"
 */

/**
 * @param {string[]} grid
 * @return {number}
 */
var largestArea = function (grid) {
  const disX = [-1, 1, 0, 0];
  const disY = [0, 0, 1, -1];
  grid = grid.map(g => g.split('').map(v => +v));
  // 靠近0的点全变值为-1,不在计入统计
  const changeGrid = (i, j, value) => {
    if (grid[i]?.[j] && grid[i]?.[j] != -1 && grid?.[i]?.[j] == value) {
      grid[i][j] = -1;
      for (let z = 0; z < 4; z++) {
        changeGrid(i + disX[z], j + disY[z], value);
      }
    }
  };
  // 去掉所有与走廊相连的值
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 0) {
        for (let z = 0; z < 4; z++) {
          // 与0相连的参考值为其它起点
          changeGrid(
            i + disX[z],
            j + disY[z],
            grid?.[i + disX[z]]?.[j + disY[z]]
          );
        }
      }
      if (i == 0 || j == 0 || i == grid.length - 1 || j == grid[0].length - 1) {
        for (let z = 0; z < 4; z++) {
          // 与走廊相连的参考点为起点
          changeGrid(i + disX[z], j + disY[z], grid?.[i]?.[j]);
        }
      }
    }
  }
  let ans = 0;
  let t = 0;
  const checkGrid = (i, j, val) => {
    if (grid[i]?.[j] == val) {
      t++;
      grid[i][j] = -1;
      for (let z = 0; z < 4; z++) {
        checkGrid(i + disX[z], j + disY[z], val);
      }
    }
  };
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] > 0) {
        t = 0;
        checkGrid(i, j, grid[i][j]);
        ans = Math.max(ans, t);
      }
    }
  }
  return ans;
};

let grid1 = ['110', '231', '221']; // 1
let grid2 = ['11111100000', '21243101111', '21224101221', '11111101111']; // 3

console.log(largestArea(grid1));
console.log(largestArea(grid2));
