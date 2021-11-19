/**
 * 
给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

 

示例 1：

输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
示例 2：

输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121]
 

提示：

1 <= nums.length <= 104
-104 <= nums[i] <= 104
nums 已按 非递减顺序 排序
 

进阶：

请你设计时间复杂度为 O(n) 的算法解决本问题
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 其中要考虑负数的情况  [-4, -1, 0, 3, 10]
var sortedSquares = function (nums) {
	let i = nums.findIndex((v) => v >= 0);
	// [-4, -1] => [16, 1]
	let negative = nums.slice(0, i).map((v) => v * v);
	// [0, 3, 10] => [0, 3, 100]
	let positive = nums.slice(i).map((v) => v * v);
	let ans = [];
	while (negative.length && positive.length) {
		if (negative[negative.length - 1] > positive[0]) {
			ans.push(positive.shift());
		} else {
			ans.push(negative.pop());
		}
	}
	if (negative.length) {
		ans = ans.concat(negative.reverse());
	}
	if (positive.length) {
		ans = ans.concat(positive);
	}
	return ans;
};

// 双指针
var sortedSquares = function (nums) {
	let n = nums.length;
	let positive = nums.findIndex((v) => v >= 0);
	let ans = [];
	let index = 0,
		i = positive === -1 ? n - 1 : positive - 1,
		j = positive === -1 ? n : positive;
	while (i >= 0 || j < n) {
		if (i < 0) {
			ans[index] = nums[j] * nums[j];
			++j;
		} else if (j == n) {
			ans[index] = nums[i] * nums[i];
			--i;
		} else if (nums[i] * nums[i] < nums[j] * nums[j]) {
			ans[index] = nums[i] * nums[i];
			--i;
		} else {
			ans[index] = nums[j] * nums[j];
			++j;
		}
		++index;
	}
	return ans;
};

console.log(sortedSquares([-4, -1, 0, 3, 10]));
