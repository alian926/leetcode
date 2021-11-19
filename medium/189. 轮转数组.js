/**
 * 
给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

 

示例 1:

输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]
示例 2:

输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释: 
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]
 

提示：

1 <= nums.length <= 105
-231 <= nums[i] <= 231 - 1
0 <= k <= 105
 

进阶：

尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。
你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
	k = k % nums.length;
	let arr = [...nums.slice(-k), ...nums.slice(0, nums.length - k)];
	for (let i = 0; i < n; ++i) {
		nums[i] = arr[i];
	}
	return nums;
};

var rotate = function (nums, k) {
	k = k % nums.length;
	let rest = nums.splice(nums.length - k, k);
	nums.unshift(...rest);
	return nums;
};

// 使用额外的数组逐一替换
var rotate = function (nums, k) {
	const n = nums.length;
	const newArr = new Array(n);
	for (let i = 0; i < n; ++i) {
		newArr[(i + k) % n] = nums[i];
	}
	for (let i = 0; i < n; ++i) {
		nums[i] = newArr[i];
	}
};

// 数组翻转
const reverse = (nums, start, end) => {
	while (start < end) {
		[nums[start], nums[end]] = [nums[end], nums[start]];
		start++;
		end--;
	}
};

/**
 * 
原始数组	1~2~3~4~5~6~7   
翻转所有元素	7~6~5~4~3~2~1  
翻转 [0, k mod n - 1] 区间的元素	5~6~7~4~3~2~1
翻转 [k mod n, n - 1] 区间的元素	5~6~7~1~2~3~4

 */
var rotate = function (nums, k) {
	k %= nums.length;
	reverse(nums, 0, nums.length - 1);
	reverse(nums, 0, k - 1);
	reverse(nums, k, nums.length - 1);
};

// var rotate = function (nums, k) {
// 	// [0,1,2]
// 	for (let i = 0; i < k; i++) {
// 		nums.unshift(nums.pop());
// 	}
// 	return nums;
// };
console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3));
console.log(rotate([1, 2], 5));
