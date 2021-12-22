/**
 * 
输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数在数组的后半部分。

 

示例：

输入：nums = [1,2,3,4]
输出：[1,3,2,4] 
注：[3,1,2,4] 也是正确的答案之一。
 

提示：

0 <= nums.length <= 50000
0 <= nums[i] <= 10000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function (nums) {
    const odd = [];
    const eve = [];
    for (let v of nums) {
        if (v % 2 === 0) {
            eve.push(v);
        } else {
            odd.push(v);
        }
    }
    return odd.concat(eve);
};

var exchange = function (nums) {
    let left = 0,
        right = nums.length - 1;
    while (left < right) {
        if (nums[left] % 2 === 0) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            right--;
        } else {
            left++;
        }
    }
    return nums;
};
