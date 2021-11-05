/**
 * 
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

进阶：

你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
 

示例 1：

输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
示例 2：

输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
示例 3：

输入：nums = [], target = 0
输出：[-1,-1]
 

提示：

0 <= nums.length <= 105
-109 <= nums[i] <= 109
nums 是一个非递减数组
-109 <= target <= 109

 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
	let lo = 0,
		hi = nums.length - 1,
		mid = 0,
		res = [-1, -1];
  // 分成三段进行操作
	while (lo <= hi) {
		mid = (lo + hi) >> 1;
		if (nums[mid] > target) {
			hi = mid - 1;
		} else if (nums[mid] < target) {
			lo = mid + 1;
		} else {
			res[0] = mid;
			res[1] = mid;
			while (nums[++mid] === target) {
				res[1]++;
			}
			mid = res[0];
			while (nums[--mid] === target) {
				res[0]--;
			}
			return res;
		}
	}
	return res;
};
console.log(searchRange([1], 1));
