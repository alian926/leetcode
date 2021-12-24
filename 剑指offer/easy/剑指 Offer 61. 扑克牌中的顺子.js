/**
 * 
从若干副扑克牌中随机抽 5 张牌，判断是不是一个顺子，即这5张牌是不是连续的。2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。

 

示例 1:

输入: [1,2,3,4,5]
输出: True
 

示例 2:

输入: [0,0,1,2,5]
输出: True
 

限制：

数组长度为 5 

数组的数取值为 [0, 13] .

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function (nums) {
    nums.sort((a, b) => a - b);
    let zeroCnt = nums.lastIndexOf(0) + 1;
    let minVal = nums[zeroCnt];
    let maxVal = nums[nums.length - 1];
    // 排除0的部分没有重复的
    if (nums.length - zeroCnt !== new Set(nums.slice(zeroCnt)).size) {
        return false;
    }
    // 除0外 最大值-最小值小于5才能构成序列
    return maxVal - minVal < nums.length;
};

var isStraight = function (nums) {
    let repeat = new Set();
    let max = 0,
        min = 14;
    for (let num of nums) {
        if (num == 0) continue; // 跳过大小王
        max = Math.max(max, num); // 最大牌
        min = Math.min(min, num); // 最小牌
        if (repeat.has(num)) return false; // 若有重复，提前返回 false
        repeat.add(num); // 添加此牌至 Set
    }
    return max - min < 5; // 最大牌 - 最小牌 < 5 则可构成顺子
};

console.log(isStraight([1, 2, 3, 4, 5])); // true
console.log(isStraight([0, 0, 1, 2, 5])); // true
console.log(isStraight([0, 0, 2, 2, 5])); // false
console.log(isStraight([12, 13, 7, 10, 8])); // false
console.log(isStraight([1, 6, 5, 4, 2])); // false
