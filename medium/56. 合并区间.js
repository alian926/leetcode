/**
 * 
 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

 

示例 1：

输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2：

输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 

提示：

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-intervals
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

// 错误回答  [[1,4],[5,6]] 是两个不连续的区间, 不能用桶计数, 否则会导致 4,5连续
// var merge = function (intervals) {
//     let arr = new Array(105).fill(0);
//     intervals.forEach(list => {
//         let start = list[0];
//         let end = list[list.length - 1];
//         for (let i = start; i <= end; i++) {
//             arr[i]++;
//         }
//     });
//     let ans = [];
//     let start = -1;
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] == 0) {
//             if (start !== -1) {
//                 ans.push([start, i - 1]);
//             }
//             start = -1;
//         }
//         if (arr[i] !== 0 && start === -1) {
//             start = i;
//         }
//     }
//     return ans;
// };

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let starts = intervals.map(list => list[0]);
    let ends = intervals.map(list => list[1]);
    let ans = [];
    let tmp = intervals[0].slice();
    for (let i = 1; i < intervals.length; i++) {
        if (starts[i] <= tmp[1]) {
            tmp[1] = Math.max(tmp[1], ends[i]);
        } else {
            ans.push(tmp);
            tmp = intervals[i].slice();
        }
    }
    ans.push(tmp);
    return ans;
};

var merge = function (intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let ans = [];
    let tmp = intervals[0].slice();
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= tmp[1]) {
            tmp[1] = Math.max(tmp[1], intervals[i][1]);
        } else {
            ans.push(tmp);
            tmp = intervals[i].slice();
        }
    }
    ans.push(tmp);
    return ans;
};

console.log(
    merge([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
    ])
); // Alian-log

console.log(
    merge([
        [
            [1, 4],
            [5, 6],
        ],
    ])
);

console.log(
    merge([
        [2, 3],
        [4, 5],
        [6, 7],
        [8, 9],
        [1, 10],
    ])
);
