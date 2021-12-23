/**
 * 
输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。

序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

 

示例 1：

输入：target = 9
输出：[[2,3,4],[4,5]]
示例 2：

输入：target = 15
输出：[[1,2,3,4,5],[4,5,6],[7,8]]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number} target
 * @return {number[][]}
 */

// 暴力解法
var findContinuousSequence = function (target) {
    const sum = arr => {
        return arr.reduce((total, cur) => total + cur, 0);
    };
    // 至少两项,单个数不超过一半大小
    let len = Math.floor((target + 1) / 2);
    let tmp = [];
    const ans = [];
    for (let i = 1; i <= len; i++) {
        // 拼接数组
        tmp = tmp
            .map(arr => arr.concat(i))
            .filter(arr => {
                let total = sum(arr);
                // 计算结果
                if (total === target && arr.length > 1) {
                    ans.push(arr.slice());
                }
                // 筛选可能成为结果的
                return total < target;
            });
        // 注入单项
        tmp.push([i]);
    }
    return ans;
};

// 双指针
var findContinuousSequence = function (target) {
    const sum = (left, right) => {
        return ((left + right) * (right - left + 1)) / 2;
    };
    const getArr = (left, right) => {
        const arr = [];
        for (let i = left; i <= right; i++) {
            arr.push(i);
        }
        return arr;
    };
    let len = Math.floor((target + 1) / 2);
    let left = 1,
        right = 2;
    const ans = [];
    while (right <= len) {
        let total = sum(left, right);
        if (total === target) {
            // 保存结果
            ans.push(getArr(left, right));
            left++;
        } else if (total + right + 1 <= target) {
            // 下一个数和需要不超过目标数, 否则向右移动会丢数
            right++;
        } else {
            left++;
        }
    }
    return ans;
};

console.log(findContinuousSequence(9));
console.log(findContinuousSequence(15));
