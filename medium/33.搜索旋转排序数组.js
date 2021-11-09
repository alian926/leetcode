/**
 * 
整数数组 nums 按升序排列，数组中的值 互不相同 。

在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

 

示例 1：

输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
示例 2：

输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1
示例 3：

输入：nums = [1], target = 0
输出：-1
 

提示：

1 <= nums.length <= 5000
-10^4 <= nums[i] <= 10^4
nums 中的每个值都 独一无二
题目数据保证 nums 在预先未知的某个下标上进行了旋转
-10^4 <= target <= 10^4
 

进阶：你可以设计一个时间复杂度为 O(log n) 的解决方案吗？

 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
	// 时间复杂度n
	return nums.indexOf(target);
};

var search = function (nums, target) {
	// 评论区中参考
	/**
    nums[0] <= nums[mid]（0 - mid不包含旋转）且nums[0] <= target <= nums[mid] 时 high 向前规约；

    nums[mid] < nums[0]（0 - mid包含旋转），target <= nums[mid] < nums[0] 时向前规约（target 在旋转位置到 mid 之间）

    nums[mid] < nums[0]，nums[mid] < nums[0] <= target 时向前规约（target 在 0 到旋转位置之间）

    其他情况向后规约

    也就是说nums[mid] < nums[0]，nums[0] > target，target > nums[mid] 三项均为真或者只有一项为真时向后规约。
   */
	let left = 0,
		right = nums.length - 1;
	while (left < right) {
		let mid = (left + right) >> 1;
		// 这个异或操作是精华, 全部满足 或者 只满足一项
		if ((nums[0] > target) ^ (nums[0] > nums[mid]) ^ (target > nums[mid]))
			left = mid + 1;
		else right = mid;
	}
	return left === right && nums[left] === target ? left : -1;
};

var search = function (nums, target) {
	// 常规方法
	let lo = 0,
		hi = nums.length - 1,
		mid = 0;
	while (lo <= hi) {
		mid = lo + hi >> 1;
		// mid 表示 取到的目标值
		if (nums[mid] === target) return mid;

		// 先根据 mid 和 lo的 大小关系判断 mid是在 左段还是右段
		if (nums[mid] >= nums[lo]) {
      // (假定有序的情况下思考最优情况 比较简单)
      // 大于等于 左值, 小于中值,  向前收敛
			if (target >= nums[lo] && target < nums[mid]) {
				hi = mid - 1;
			} else {
				lo = mid + 1;
			}
		} else {
      // 比中值大, 小于等于右值, 向后收敛
			if (target > nums[mid] && target <= nums[hi]) {
				lo = mid + 1;
			} else {
				hi = mid - 1;
			}
		}
	}
	return -1;
};
