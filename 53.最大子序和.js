/** 
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例:

输入: [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
进阶:

如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。

*/
/**
 * @param {number[]} nums
 * @return {number}
 */

// 动态规划的思想,整个步骤可以划分成若干个相连的小步骤,每个阶段都要做决策,使整体达到最好
// f(i) = max{f(i-1)+ai, ai}
// 当前值的大小和前面的值相关联
var maxSubArray = function(nums) {
    //pre保存前面产生的最大值, 也可以用数组保存每一步的值,不过数组会花费更多空间
    let pre = 0, maxVal = nums[0];
    nums.forEach( v => {
        //比较前面的值加上当前值,和当前值比较的大小, 记录下来
        pre = Math.max(pre+v, v);
        maxVal = Math.max(pre,maxVal);
    })
    return maxVal
};


//分冶的想法

function Status(l, r, m, i) {
    //lSum 表示以l为左端点的最大字段和
    this.lSum = l;
    //rSum表示以r为右端点的最大字段和
    this.rSum = r;
    // 表示[l,r]内的最大子段和
    this.mSum = m;
    // 表示[l,r]的区间和
    this.iSum = i;
}

const pushUp = (l, r) => {
    //左区间和加上右区间和,累计
    const iSum = l.iSum + r.iSum;
    //左区间最大值为左块最大值,或者左块全部加上右块最大值
    const lSum = Math.max(l.lSum, l.iSum + r.lSum);
    //右区间最大值为右块最大值,或者右块全部加上左块最大值
    const rSum = Math.max(r.rSum, r.iSum + l.rSum);
    //最大的  可能是左或右的最大值, 或者是左右的和
    const mSum = Math.max(Math.max(l.mSum, r.mSum), l.rSum + r.lSum);
    return new Status(lSum, rSum, mSum, iSum);
}
//查询a序列[l,r]区间内的最大子段和
const getInfo = (a, l, r) => {
    if (l === r) {
        return new Status(a[l], a[l], a[l], a[l]);
    }
    //分冶求解
    const m = (l + r) >> 1;
    //左子区间
    const lSub = getInfo(a, l, m);
    //右子区间
    const rSub = getInfo(a, m + 1, r);
    //回升求值
    return pushUp(lSub, rSub);
}

var maxSubArray = function(nums) {
    return getInfo(nums, 0, nums.length - 1).mSum;
};