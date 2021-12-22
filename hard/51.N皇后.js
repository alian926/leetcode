/** 
 * n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。



上图为 8 皇后问题的一种解法。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

 

示例：

输入：4
输出：[
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。
 

提示：

皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。

*/

var solveNQueens = function(n) {
    // 创建 二维数组 棋盘,填充
    const board = new Array(n);
    for (let i = 0; i < n; i++) {
        board[i] = new Array(n).fill('.');
    }
    // 列集，记录出现过皇后的列
    const cols = new Set();  
    // 反对角线集1 行列之和 相等
    const diag1 = new Set(); 
    // 正对角线集2 行列之差相等
    const diag2 = new Set(); 
    // 结果
    const res = [];

    const helper = (row) => {
        if (row == n) {
            // 将结果 转为一维数组, 存入结果, 用slice()即可,没有修改内部数组的内容,不会影响board 
            const stringsBoard = board.slice();
            for (let i = 0; i < n; i++) {
                stringsBoard[i] = stringsBoard[i].join('');
            }
            res.push(stringsBoard);
            return;
        }
        for (let col = 0; col < n; col++) {
        // 如果当前点的行列对角线都没有皇后，即可选择，否则，跳过
            if (!cols.has(col) && !diag1.has(row + col) && !diag2.has(row - col)) { 
                // 放置皇后
                board[row][col] = 'Q';
                // 进行充分剪枝
                // 记录放了皇后的列
                cols.add(col);
                // 记录放了皇后的反对角线
                diag1.add(row + col);
                // 记录放了皇后的正对角线
                diag2.add(row - col);

                // 进行递归
                helper(row + 1);
                // 撤销抉择,进行下一次选择

                // 撤销该点的皇后
                board[row][col] = '.';
                // 对应的记录也删一下
                cols.delete(col);
                diag1.delete(row + col);
                diag2.delete(row - col);
            }
        }
    };
    helper(0);
    return res;
};