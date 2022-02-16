/**
 * 
给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

必须在不使用库的sort函数的情况下解决这个问题。

 

示例 1：

输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
示例 2：

输入：nums = [2,0,1]
输出：[0,1,2]
 

提示：

n == nums.length
1 <= n <= 300
nums[i] 为 0、1 或 2
 

进阶：

你可以不使用代码库中的排序函数来解决这道题吗？
你能想出一个仅使用常数空间的一趟扫描算法吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sort-colors
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    // 原地排序nums中的0,1,2 常数空间
    let start = 0,
        end = nums.length - 1;
    // 0前移, 1后移
    for (let i = 0; i <= end; i++) {
        if (nums[i] === 0 && i !== start) {
            [nums[i], nums[start]] = [nums[start], nums[i]];
            start++;
            i--;
        }
        if (nums[i] === 2 && i !== end) {
            [nums[i], nums[end]] = [nums[end], nums[i]];
            i--;
            end--;
        }
    }
    return nums;
};

var sortColors = function(nums) {
    let index = 0, n = nums.length;
    // 0前移
    for(let i = 0; i < n; i++){
        if(nums[i] === 0){
            [nums[index], nums[i]] = [nums[i], nums[index]];
            index++;
        }
    }
    // 1前移
    for(let i = index; i < n; i++){
        if(nums[i] === 1){
            [nums[index], nums[i]] = [nums[i], nums[index]];
            index++;
        }
    }
    return nums;
};


console.log(sortColors([2, 0, 2, 1, 1, 0]));


console.log(sortColors([2,0,1]))