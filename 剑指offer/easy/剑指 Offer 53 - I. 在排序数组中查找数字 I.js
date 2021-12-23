/**
 * 
统计一个数字在排序数组中出现的次数。

 

示例 1:

输入: nums = [5,7,7,8,8,10], target = 8
输出: 2
示例 2:

输入: nums = [5,7,7,8,8,10], target = 6
输出: 0
 

提示：

0 <= nums.length <= 105
-109 <= nums[i] <= 109
nums 是一个非递减数组
-109 <= target <= 109
 

注意：本题与主站 34 题相同（仅返回值不同）：https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/



来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let left = 0,
        right = nums.length - 1;
    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        if (nums[mid] == target) {
            left = mid;
            right = mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    if (nums[left] === target) {
        while (nums[left] === target) {
            left--;
        }
        left++;
        while (nums[right] === target) {
            right++;
        }
        right--;
        return right - left + 1;
    }
    return 0;
};

console.log(search([5, 7, 7, 8, 8, 10], 6));
