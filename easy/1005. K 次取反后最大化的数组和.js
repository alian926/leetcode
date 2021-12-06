/**
 * 
给你一个整数数组 nums 和一个整数 k ，按以下方法修改该数组：

选择某个下标 i 并将 nums[i] 替换为 -nums[i] 。
重复这个过程恰好 k 次。可以多次选择同一个下标 i 。

以这种方式修改数组后，返回数组 可能的最大和 。

 

示例 1：

输入：nums = [4,2,3], k = 1
输出：5
解释：选择下标 1 ，nums 变为 [4,-2,3] 。
示例 2：

输入：nums = [3,-1,0,2], k = 3
输出：6
解释：选择下标 (1, 2, 2) ，nums 变为 [3,1,0,2] 。
示例 3：

输入：nums = [2,-3,-1,5,-4], k = 2
输出：13
解释：选择下标 (1, 4) ，nums 变为 [2,3,-1,5,4] 。
 

提示：

1 <= nums.length <= 104
-100 <= nums[i] <= 100
1 <= k <= 104
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumAfterKNegations = function (nums, k) {
  let minIdx = 0;
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] < nums[minIdx]) {
        minIdx = j;
      }
    }
    nums[minIdx] = -nums[minIdx];
  }
  return nums.reduce((total, cur) => total + cur, 0);
};

var largestSumAfterKNegations = function (nums, k) {
  // 频率统计
  const freq = new Map();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }
  let ans = _.sum(nums);
  // 将原有的负数进行修改
  for (let i = -100; i < 0; ++i) {
    if (freq.has(i)) {
      // 获取可操作数量
      const ops = Math.min(k, freq.get(i));
      // 一个负数变成正式  和增加了 2x (-x -> x)
      ans += -i * ops * 2;
      freq.set(i, freq.get(i) - ops);
      freq.set(-i, (freq.get(-i) || 0) + ops);
      k -= ops;
      if (k === 0) {
        break;
      }
    }
  }
  // 还有剩余的k, k为奇数, 没有0, 需要修改正数的情况
  if (k > 0 && k % 2 === 1 && !freq.has(0)) {
    for (let i = 1; i <= 100; ++i) {
      if (freq.has(i)) {
        ans -= i * 2;
        break;
      }
    }
  }
  return ans;
};

var largestSumAfterKNegations = (nums, k) => {
  let number = new Array(201).fill(0); //-100 <= nums[i] <= 100,这个范围的大小是201
  for (t of nums) {
    number[t + 100]++; //将值[-100,100]映射到键[0,200]上
  }
  let i = 0;
  while (k > 0) {
    while (number[i] == 0)
      //找到A[]中最小的数字
      i++
    number[i]--; //此数字个数-1
    number[200 - i]++; //其相反数个数+1
    // i超过100了,记录的最小索引实际是200-i
    if (i > 100) {
      //若原最小数索引>100,则新的最小数索引应为200-i.(索引即number[]数组的下标)
      i = 200 - i;
    }
    k--;
  }
  let sum = 0;
  for (let j = i; j < number.length; j++) {
    //遍历number[]求和
    sum += (j - 100) * number[j]; //j-100是数字大小,number[j]是该数字出现次数.
  }
  return sum;
};
