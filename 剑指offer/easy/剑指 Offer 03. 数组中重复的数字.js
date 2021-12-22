/**
 * 
找出数组中重复的数字。


在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

示例 1：

输入：
[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3 
 

限制：

2 <= n <= 100000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// 排序 查找相同的
var findRepeatNumber = function (nums) {
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] == nums[i + 1]) {
            return nums[i];
        }
    }
};

// hash
var findRepeatNumber = function (nums) {
    const set = new Set();
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) {
            return nums[i];
        } else {
            set.add(nums[i]);
        }
    }
};

// 原地排序, 将值放到对应的下标处, 遇到相同的则为答案, 如将值5放到下标5处
var findRepeatNumber = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        let target = nums[i];
        if (target !== nums[target]) {
            [nums[i], nums[target]] = [nums[target], nums[i]];
            // 需要-1位, 重新计算移过来的元素
            i--;
        } else if (target !== i) {
            return target;
        }
    }
};

console.log(findRepeatNumber([3, 4, 2, 0, 0, 1]));
