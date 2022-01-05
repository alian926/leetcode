/**
 * 
给你一个大小为 m x n 的网格和一个球。球的起始坐标为 [startRow, startColumn] 。你可以将球移到在四个方向上相邻的单元格内（可以穿过网格边界到达网格之外）。你 最多 可以移动 maxMove 次球。

给你五个整数 m、n、maxMove、startRow 以及 startColumn ，找出并返回可以将球移出边界的路径数量。因为答案可能非常大，返回对 10^9 + 7 取余 后的结果。

 

示例 1：


输入：m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
输出：6
示例 2：


输入：m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
输出：12
 

提示：

1 <= m, n <= 50
0 <= maxMove <= 50
0 <= startRow < m
0 <= startColumn < n

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/out-of-boundary-paths
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number} m
 * @param {number} n
 * @param {number} maxMove
 * @param {number} startRow
 * @param {number} startColumn
 * @return {number}
 */

// 超时, 需要优化
var findPaths = function (m, n, maxMove, startRow, startColumn) {
    const mod = Math.pow(10, 9) + 7;
    let ans = 0;

    const dirs = [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
    ];
    /**
     *
     * @param {*} r 当前横坐标
     * @param {*} c 当前纵坐标
     * @param {*} max 当前移动步数
     */
    const d = (r, c, max) => {
        // 超过可移动次数,退出
        if (max > maxMove) {
            return;
        }
        if (r >= m || r < 0 || c >= n || c < 0) {
            // 越界,记录结果
            ans++;
            return;
        }
        for (let z = 0; z < 4; z++) {
            const disR = dirs[z][0] + r;
            const disC = dirs[z][1] + c;
            d(disR, disC, max + 1);
        }
    };
    d(startRow, startColumn, 0);
    return ans % mod;
};

var findPaths = function (m, n, maxMove, startRow, startColumn) {
    // 一维下标是计算后的序列, 二维下标是移动数
    const f = new Array(m * n).fill(0).map(() => new Array(maxMove + 1).fill(0));
    function add(x, y) {
        for (let k = 1; k <= maxMove; k++) {
            f[getIdx(x, y)][k]++;
        }
    }
    function getIdx(x, y) {
        return x * n + y;
    }
    function parseIdx(idx) {
        return [Math.floor(idx / n), idx % n];
    }
    let MOD = 1e9 + 7;
    const dirs = [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
    ];
    
    // 初始化边缘格子的路径数量
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i == 0) add(i, j);
            if (j == 0) add(i, j);
            if (i == m - 1) add(i, j);
            if (j == n - 1) add(i, j);
        }
    }
    // 从小到大枚举「可移动步数」
    for (let k = 1; k <= maxMove; k++) {
        // 枚举所有的「位置」
        for (let idx = 0; idx < m * n; idx++) {
            let info = parseIdx(idx);
            let x = info[0],
                y = info[1];
            for (let d of dirs) {
                let nx = x + d[0],
                    ny = y + d[1];
                // 不考虑超出表格外的
                if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
                let nidx = getIdx(nx, ny);
                f[idx][k] += f[nidx][k - 1];
                f[idx][k] %= MOD;
            }
        }
    }
    return f[getIdx(startRow, startColumn)][maxMove];
};

console.log(findPaths(2, 2, 2, 0, 0)); // 6

console.log(findPaths(1, 3, 3, 0, 1)); // 12

console.log(findPaths(8, 7, 16, 1, 5));

0;
0;
0;
