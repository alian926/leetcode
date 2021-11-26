/**
 * 
给定一个由 0 和 1 组成的矩阵 mat ，请输出一个大小相同的矩阵，其中每一个格子是 mat 中对应位置元素到最近的 0 的距离。

两个相邻元素间的距离为 1 。

 

示例 1：



输入：mat = [[0,0,0],[0,1,0],[0,0,0]]
输出：[[0,0,0],[0,1,0],[0,0,0]]
示例 2：



输入：mat = [[0,0,0],[0,1,0],[1,1,1]]
输出：[[0,0,0],[0,1,0],[1,2,1]]
 

提示：

m == mat.length
n == mat[i].length
1 <= m, n <= 104
1 <= m * n <= 104
mat[i][j] is either 0 or 1.
mat 中至少有一个 0 
 */

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
// 从0点进行扩散, 记录下所有的0值,将其余的点标记为无效值
// 查看每个0点的周围是否有无效值, 对其进行修改记录,再次扩散
function updateMatrix(mat) {
  // 首先将所有的 0 都入队，并且将 1 的位置设置成 -1，表示该位置是 未被访问过的 1
  let m = mat.length,
    n = mat[0].length;
  let queue = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        queue.push([i, j]);
      } else {
        mat[i][j] = -1;
      }
    }
  }

  let dx = [-1, 1, 0, 0];
  let dy = [0, 0, -1, 1];
  while (queue.length) {
    let point = queue.shift();
    let x = point[0],
      y = point[1];
    for (let i = 0; i < 4; i++) {
      let newX = x + dx[i];
      let newY = y + dy[i];
      // 如果四邻域的点是 -1，表示这个点是未被访问过的 1
      // 所以这个点到 0 的距离就可以更新成 mat[x][y] + 1。
      if (newX >= 0 && newX < m && newY >= 0 && newY < n && mat[newX][newY] == -1) {
        mat[newX][newY] = mat[x][y] + 1;
        queue.push([newX, newY]);
      }
    }
  }

  return mat;
}

console.log(
  updateMatrix([
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ])
);

// console.log(
//   updateMatrix([
//     [1, 1, 0, 0, 1, 0, 0, 1, 1, 0],
//     [1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
//     [1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
//     [0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
//     [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
//     [1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
//     [0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
//     [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
//     [0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
//     [1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
//   ])
// );
