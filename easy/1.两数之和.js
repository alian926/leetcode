/* 
    给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

    你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

    给定 nums = [2, 7, 11, 15], target = 9

    因为 nums[0] + nums[1] = 2 + 7 = 9
    所以返回 [0, 1]
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var nums = [2, 7, 11, 15], target = 9;
var twoSum = function(nums, target) {
    //利用hashmap 进行计算
    let store = {},result;
    for(let i=0,length=nums.length;i<length;i++) {
        //当前获取的值
        let currentValue = nums[i];
        //需要的差值
        let needValue = target - currentValue;
        //若需要的值以及定义则完成计算,不可以用类型转换的判断,存在0的情况
        if(store[needValue] !== undefined) {
            result = [store[needValue],i];
            break;
        }else {
            store[currentValue] = i;
        }
    }
    return result;
};

console.log(twoSum(nums,target))