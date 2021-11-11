/**
 * 
给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标。

 

示例 1：

输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
示例 2：

输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
 

提示：

1 <= nums.length <= 3 * 104
0 <= nums[i] <= 105
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 贪心算法
// 对于某一个位置y, 从x能到达y点, 需满足 x+nums[x]>=y
// 从初始位置逐渐向右寻找最大可访问距离
var canJump = function (nums) {
	let n = nums.length;
	let rightmost = 0;
	for (let i = 0; i < n; i++) {
		if (i <= rightmost) {
			rightmost = Math.max(rightmost, i + nums[i]);
			if (rightmost >= n - 1) {
				return true;
			}
		}
	}
	return false;
};

// 动态规划, 和爬楼梯类似
var canJump = function (nums) {
	let n = nums.length,
  // 下标i出可以达到的最远距离
		dp = [nums[0]];
	if (n === 1) return true; //特殊处理
	for (let i = 1; i < n; ++i) {
    // i位置可以到达
		if (i <= dp[i - 1]) {
      // 下标i处可到达的最远距离为 i-1的值 或者自身 i+nums[i] 可到达的距离
			dp[i] = Math.max(dp[i - 1], i + nums[i]);
			if (dp[i] >= n - 1) {
				return true;
			}
		}
	}
	return false;
};
