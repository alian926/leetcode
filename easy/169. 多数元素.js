/**
 * 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

 

示例 1:

输入: [3,2,3]
输出: 3
示例 2:

输入: [2,2,1,1,1,2,2]
输出: 2

 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// 哈希表的方法
var majorityElement = function(nums) {
    let maps = {}, res= nums[0];
    
    nums.forEach( i => {
        if(maps[i]) {
            ++maps[i]
            res = maps[res] >= maps[i] ? res : i 
        }else {
            maps[i] = 1
        }
    })
    
    return res
};

// 排序的方法  n/2 的位置就是众数

//投票算法
var majorityElement = function(nums) {
    // 候选众数res  出现次数count
    let res , count=0;
    // 众数出现频率在一半以上, 最后的count会是个正数, 众数和 其他数的 +1 或 -1的和在0上下浮动
    for(let i of nums) {
        if(count == 0) {
            res = i
        }
        count += (i == res) ? 1 : -1 
    }
    return res
}