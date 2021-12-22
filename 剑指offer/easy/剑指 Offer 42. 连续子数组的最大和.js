/**
 * 
输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

要求时间复杂度为O(n)。

 

示例1:

输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 

提示：

1 <= arr.length <= 10^5
-100 <= arr[i] <= 100

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    let max = -Infinity;
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        let val = nums[i];
        if (total > 0 && total + val > 0) {
            total += val;
        } else {
            total = val;
        }
        max = Math.max(max, total);
    }
    return max;
};

var maxSubArray = function (nums) {
    let pre = 0,
        maxAns = nums[0];
    nums.forEach(x => {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
};


// 前缀和
var maxSubArray = function (nums) {
    let min = 0;
    let ans = -Infinity;
    let num = 0;
    for (let i = 0; i < nums.length; i++) {
        num += nums[i];
        ans = Math.max(ans, num - min);
        if (num < min) {
            min = num;
        }
    }
    return ans;
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
