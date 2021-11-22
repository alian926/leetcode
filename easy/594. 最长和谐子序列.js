/**
 * 
和谐数组是指一个数组里元素的最大值和最小值之间的差别 正好是 1 。

现在，给你一个整数数组 nums ，请你在所有可能的子序列中找到最长的和谐子序列的长度。

数组的子序列是一个由数组派生出来的序列，它可以通过删除一些元素或不删除元素、且不改变其余元素的顺序而得到。

 

示例 1：

输入：nums = [1,3,2,2,5,2,3,7]
输出：5
解释：最长的和谐子序列是 [3,2,2,2,3]
示例 2：

输入：nums = [1,2,3,4]
输出：2
示例 3：

输入：nums = [1,1,1,1]
输出：0
 

提示：

1 <= nums.length <= 2 * 104
-109 <= nums[i] <= 109

 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function (nums) {
	nums.sort((a, b) => a - b);
	let ans = 0;
	let map = new Map();
	nums.forEach((value, i) => {
		if (!map.has(value)) {
			map.set(value, i);
		}
		if (map.has(value - 1)) {
			ans = Math.max(ans, i - map.get(value - 1) + 1);
		}
	});
	return ans;
};

// 枚举 滑动窗口
var findLHS = function(nums) {
  nums.sort((a, b) => a - b);
  let begin = 0;
  let ans = 0;
  for (let end = 0; end < nums.length; end++) {
      while (nums[end] - nums[begin] > 1) {
          begin++;
      }
      if (nums[end] - nums[begin] === 1) {
          ans = Math.max(ans, end - begin + 1);
      }
  }
  return ans;
};

console.log(findLHS([1, 3, 2, 2, 5, 2, 3, 7]));
