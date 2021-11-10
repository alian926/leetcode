/**
 * 
给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

 

示例 1：
1 2 3       7 4 1
4 5 6  ->   8 5 2
7 8 9       9 6 3

输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]
示例 2：


输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
示例 3：

输入：matrix = [[1]]
输出：[[1]]
示例 4：

输入：matrix = [[1,2],[3,4]]
输出：[[3,1],[4,2]]
 

提示：

matrix.length == n
matrix[i].length == n
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000
 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

// 必须原地修改矩阵, 不能使用另一个矩阵
/**
 * 矩阵中的元素 都有  matrix[row][col] ---旋转--> matrix[col][n-row-1], 从0开始记录行数
 *
 */
// 使用辅助数组,不是本题需要的解法
var rotate = function (matrix) {
	const n = matrix.length;
	const matrix_new = new Array(n).fill(0).map(() => new Array(n).fill(0));
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			matrix_new[j][n - i - 1] = matrix[i][j];
		}
	}
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			matrix[i][j] = matrix_new[i][j];
		}
	}
};

// 原地旋转,参考官方题解: https://leetcode-cn.com/problems/rotate-image/solution/xuan-zhuan-tu-xiang-by-leetcode-solution-vu3m/
var rotate = function(matrix) {
  const n = matrix.length;
  for (let i = 0; i < Math.floor(n / 2); ++i) {
      for (let j = 0; j < Math.floor((n + 1) / 2); ++j) {
          const temp = matrix[i][j];
          matrix[i][j] = matrix[n - j - 1][i];
          matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
          matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
          matrix[j][n - i - 1] = temp;
      }
  }
};

// 翻转代替旋转, 先水平翻转再主对角线(左上到右下)翻转就可以得到顺时针旋转90的效果
// 水平翻转 matrix[row][col] -->  matrix[n−row−1][col]
// 主对角线翻转 matrix[row][col] ---> matrix[col][row]
​
var rotate = function(matrix) {
  const n = matrix.length;
  // 水平翻转
  for (let i = 0; i < Math.floor(n / 2); i++) {
      for (let j = 0; j < n; j++) {
          [matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]];
      }
  }
  // 主对角线翻转
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < i; j++) {
          [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
  }
};