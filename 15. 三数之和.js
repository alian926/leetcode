/*
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]

*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
//此方式超时了
var threeSum = function(nums) {
    let checkIncludes = function(target, base) {
        for(let i=0,len=base.length; i<len;i++){
            //idx 作为 target 取值的下标
            let idx = 0;
            let nowArr = base[i].slice();
            while(idx < target.length) {
                let index = nowArr.indexOf(target[idx]);
                if(index > -1){
                    nowArr.splice(index,1);
                    idx++
                }else {
                    break;
                }
                if(idx == target.length) {
                    return true;
                }
            }
        }
        return false;
    }
    let res = [];
    for(let i=0,len=nums.length;i<len;i++) {
        for(let j=i+1;j<len;j++) {
            let sliceArr = nums.slice(j+1);
            let idx = sliceArr.indexOf(-(nums[i]+nums[j]));
            if(idx>-1){
                let tmp = [nums[i],nums[j],sliceArr[idx]];
                if(!checkIncludes(tmp, res)) {
                    res.push(tmp)
                }
            }
        }
    }
    return res
};
// 此问题,类似两数求和,可以利用hashMap, let hash = { 1: [0,-1]},这种结构,1个人找其他两个人
// 这样问题复杂度变成了 O(n ^ 2);

//但是如果利用排序,提前处理好数组, 复杂度就成了 O(n * log n),比O(n ^ 2)小的多
//排好序后,以最左边的数字作为基准,右边两个数滑动
var threeSum = function(nums) {
    let res = [];
    let length = nums.length;
    nums.sort((a,b) => a - b);
    //由于边界值比较多,判断能处理的类型
    //如果同符号,则不可能是0, 必须两侧不同符号,或者都是0
    if(nums[0] <= 0 && nums[length-1] >= 0) {
        for(let first=0; first < length - 2;) {
            if (nums[first] > 0) break; // 最左值为正数则一定无解
            //first为基准值, second,third 要和i配对的值,两者不小于i
            let second = first + 1;
            let third = length - 1;
            while (second < third) {
                if (nums[first] * nums[third] > 0) break // 两人选相遇，或者三人同符号，则退出
                let result = nums[first] + nums[second] + nums[third]
                if (result === 0) { // 如果可以组队
                    res.push([nums[first], nums[second], nums[third]])
                }
                if (result <= 0 ) { 
                    // 和小了，把小数那边右移放大,跳过相等的
                    while (second < third && nums[second] === nums[++second]){} 
                } else { 
                    // 和大了，把大数那边左移,跳过相等的
                    while (second < third && nums[third] === nums[--third]) {}
                }
            } 
            while (nums[first] === nums[++first]){}
        }
    }
    return res;
}