/**
 * 
在给定的网格中，每个单元格可以有以下三个值之一：

值 0 代表空单元格；
值 1 代表新鲜橘子；
值 2 代表腐烂的橘子。
每分钟，任何与腐烂的橘子（在 4 个正方向上）相邻的新鲜橘子都会腐烂。

返回直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1。

 

示例 1：



输入：[[2,1,1],[1,1,0],[0,1,1]]
输出：4
示例 2：

输入：[[2,1,1],[0,1,1],[1,0,1]]
输出：-1
解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个正向上。
示例 3：

输入：[[0,2]]
输出：0
解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
 

提示：

1 <= grid.length <= 10
1 <= grid[0].length <= 10
grid[i][j] 仅为 0、1 或 2
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  let m = grid.length,
    n = grid[0].length;
  const STATUS = {
    // 还有新鲜的
    BETTER: 1,
    // 全是坏的
    WRONG: -1,
    // 无法变坏了
    NOTOUCH: 0,
  };
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  const findGood = () => {
    let goBad = false;
    let haveGood = false;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] == 1) {
          haveGood = true;
          for (let d = 0; d < 4; d++) {
            let newI = i + dx[d];
            let newJ = j + dy[d];
            if (newI >= 0 && newJ >= 0 && newI < m && newJ < n && grid[newI][newJ] === 2) {
              goBad = true;
            }
          }
        }
      }
    }
    if (haveGood) {
      return goBad ? STATUS.BETTER : STATUS.NOTOUCH;
    } else {
      return STATUS.WRONG;
    }
  };
  let ans = 0;
  let queue = [];
  // 扫描所有的坏橘子
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
      }
    }
  }
  while (queue.length && findGood() === STATUS.BETTER) {
    let tmp = [];
    ans++;
    queue.forEach(pos => {
      for (let d = 0; d < 4; d++) {
        let newI = pos[0] + dx[d];
        let newJ = pos[1] + dy[d];
        if (newI >= 0 && newJ >= 0 && newI < m && newJ < n && grid[newI][newJ] === 1) {
          grid[newI][newJ] = 2;
          tmp.push([newI, newJ]);
        }
      }
    });
    queue = tmp;
  }
  if (findGood() === STATUS.NOTOUCH) {
    return -1;
  }
  return ans;
};

// 记录所有的橘子数量和变坏的橘子数量, 这样就不用每轮都扫描
var orangesRotting = function (grid) {
  let total = 0, rot = 0, times = 0, queue = [];
  const m = grid.length, n = grid[0].length;
  for (let i = 0; i < m; i++) { // 遍历grid, 确定🍊总数，及将腐烂🍊放入队列
      for (let j = 0; j < n; j++) {
          grid[i][j] && total++; //该网格非0，说明是有🍊(可能好可能坏)总数++
          if (grid[i][j] === 2) {
              queue.push([i, j]);
              rot++;
          }
      }
  }
  if (rot === total) return 0; //遍历完grid, 发现都是坏橘子，直接return
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]; //向四个方向腐烂
  while (queue.length) { // 开始bfs 
      let len = queue.length;
      if (rot === total) return times;//最后一遍都感染完了rot=total 直接返回
      while (len--) {
          let [r, c] = queue.shift();
          for (let i = 0; i < 4; i++) {
              let row = r + dirs[i][0];
              let col = c + dirs[i][1];
              if (row < 0 || row >= m || col < 0 || col >= n) continue;
              if (grid[row][col] === 1) {
                  grid[row][col] = 2;
                  rot++; // 每次新感染一个好橘子，rot数量++
                  queue.push([row, col]);
              }
          }
      }
      times++;
  }
  return rot === total ? times : -1; // 最后有可能有触及不到的好橘子 返回-1
};
