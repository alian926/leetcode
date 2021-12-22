/**
 * 
输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

 

示例 1：

输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
示例 2：

输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 

限制：

0 <= matrix.length <= 100
0 <= matrix[i].length <= 100
注意：本题与主站 54 题相同：https://leetcode-cn.com/problems/spiral-matrix/

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    let i = 0,
        j = 0;
    const maxI = matrix.length,
        maxJ = matrix[0]?.length || 0;
    const total = maxI * maxJ;
    // 第q圈
    let q = 0;
    const tag = {
        r: 0,
        b: 1,
        l: 2,
        u: 3,
    };
    const getCurrent = (i, j, c) => {
        switch (c) {
            case tag.r:
                if (j >= maxJ - q) {
                    current = tag.b;
                }
                break;
            case tag.b:
                if (i >= maxI - q) {
                    current = tag.l;
                }
                break;
            case tag.l:
                if (j < q) {
                    // 向上运动的时候, 圈数+1
                    current = tag.u;
                    q++;
                }
                break;
            case tag.u:
                if (i < q) {
                    current = tag.r;
                }
        }
    };
    const dir = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    let current = tag.r;
    let ans = [];
    while (true) {
        if (ans.length === total) {
            break;
        }
        ans.push(matrix[i][j]);
        // 需要判断下一个点的方向,是否需要转向
        getCurrent(i + dir[current][0], j + dir[current][1], current);
        i += dir[current][0];
        j += dir[current][1];
    }
    return ans;
};

console.log(
    spiralOrder([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ])
);
