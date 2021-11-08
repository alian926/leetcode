/**
 * 
给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。

 

示例 1：

输入：nums = [3,0,1]
输出：2
解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。
示例 2：

输入：nums = [0,1]
输出：2
解释：n = 2，因为有 2 个数字，所以所有的数字都在范围 [0,2] 内。2 是丢失的数字，因为它没有出现在 nums 中。
示例 3：

输入：nums = [9,6,4,2,3,5,7,0,1]
输出：8
解释：n = 9，因为有 9 个数字，所以所有的数字都在范围 [0,9] 内。8 是丢失的数字，因为它没有出现在 nums 中。
示例 4：

输入：nums = [0]
输出：1
解释：n = 1，因为有 1 个数字，所以所有的数字都在范围 [0,1] 内。1 是丢失的数字，因为它没有出现在 nums 中。
 

提示：

n == nums.length
1 <= n <= 104
0 <= nums[i] <= n
nums 中的所有数字都 独一无二

进阶：你能否实现线性时间复杂度、仅使用额外常数空间的算法解决此问题?
 */
/**
 * @param {number[]} nums
 * @return {number}
 */

var missingNumber = function (nums) {
	let n = nums.length;
	nums.sort((a, b) => a - b);
	for (let i = 0; i < n; i++) {
		if (nums[i] != i) return i;
	}
	return n;
};

// 数学作差
var missingNumber = function (nums) {
	let total = (nums.length * (nums.length + 1)) >> 1;
	let currentTotal = nums.reduce((pre, cur) => pre + cur, 0);
	return total - currentTotal;
};

// hash
var missingNumber = function (nums) {
	const { length } = nums;
	const store = {};
	nums.forEach((v) => {
		store[v] = true;
	});
	for (let i = 0; i <= length; i++) {
		if (!store[i]) {
			return i;
		}
	}
};

// 原地hash
var missingNumber = function (nums) {
	let n = nums.length;
	function swap(nums, i, j) {
		let c = nums[i];
		nums[i] = nums[j];
		nums[j] = c;
	}
	for (let i = 0; i < n; i++) {
		if (nums[i] != i && nums[i] < n) swap(nums, nums[i], i--);
	}
	for (let i = 0; i < n; i++) {
		if (nums[i] != i) return i;
	}
	return n;
};

// 异或法, 找缺失数、找出现一次数都是异或的经典应用。
var missingNumber = function (nums) {
	let n = nums.length;
	let ans = 0;
	for (let i = 0; i <= n; i++) ans ^= i;
	for (let i of nums) ans ^= i;
	return ans;
};
