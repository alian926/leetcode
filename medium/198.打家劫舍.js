/** 
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

 

示例 1：

输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
示例 2：

输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
 
[2,1,1,2]
4
提示：

0 <= nums.length <= 100
0 <= nums[i] <= 400
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
// 并不是隔一个取值就是最大
// 动态规划, 常规解法, 每步有依赖于前面的情况
var rob = function (nums) {
  if (nums.length <= 1) return nums[0] || 0;
  let dp = [];
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  // 当前位置的最大值, 取决于前第一个  或者 前第二个和当前值的和
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }
  return dp[nums.length - 1];
};
// 动态规划, 由于每个房间的情况只和前两个房间有关,所以可以使用滚动数组
var rob = function (nums) {
  if (nums.length <= 1) return nums[0] || 0;
  let dp = [];
  let first = nums[0];
  let second = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    // first,second 向后移动1位
    // 更新位置后 second其实就是当前位置最大的值
    let tmp = second;
    second = Math.max(first + nums[i], second);
    first = tmp;
  }
  return second;
};
