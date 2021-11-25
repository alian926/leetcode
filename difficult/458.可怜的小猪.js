/**
 * 
有 buckets 桶液体，其中 正好 有一桶含有毒药，其余装的都是水。它们从外观看起来都一样。为了弄清楚哪只水桶含有毒药，你可以喂一些猪喝，通过观察猪是否会死进行判断。不幸的是，你只有 minutesToTest 分钟时间来确定哪桶液体是有毒的。

喂猪的规则如下：

选择若干活猪进行喂养
可以允许小猪同时饮用任意数量的桶中的水，并且该过程不需要时间。
小猪喝完水后，必须有 minutesToDie 分钟的冷却时间。在这段时间里，你只能观察，而不允许继续喂猪。
过了 minutesToDie 分钟后，所有喝到毒药的猪都会死去，其他所有猪都会活下来。
重复这一过程，直到时间用完。
给你桶的数目 buckets ，minutesToDie 和 minutesToTest ，返回在规定时间内判断哪个桶有毒所需的 最小 猪数。

 

示例 1：

输入：buckets = 1000, minutesToDie = 15, minutesToTest = 60
输出：5
示例 2：

输入：buckets = 4, minutesToDie = 15, minutesToTest = 15
输出：2
示例 3：

输入：buckets = 4, minutesToDie = 15, minutesToTest = 30
输出：2
 

提示：

1 <= buckets <= 1000
1 <= minutesToDie <= minutesToTest <= 100
 */

/**
 * @param {number} buckets
 * @param {number} minutesToDie
 * @param {number} minutesToTest
 * @return {number}
 */

// 问题的等价描述是：在 buckets 桶液体中恰好有一桶有毒，至少需要多少只小猪才能在 iterations 轮测试中确定有毒的是哪一桶。

// 从另一个角度考虑:  用 f(i, j) 表示 i 只小猪测试 j 轮最多可以在多少桶液体中确定有毒的是哪一桶。在确定最大测试轮数为iterations 的情况下，需要计算使得 f(i, iterations)≥buckets 成立的最小的 i。
// f(i,0) = 1;  f(0,j)=1;

// 官方题解 https://leetcode-cn.com/problems/poor-pigs/solution/ke-lian-de-xiao-zhu-by-leetcode-solution-z0h7/
var poorPigs = function (buckets, minutesToDie, minutesToTest) {
  // 正好有一桶是毒药
  if (buckets === 1) {
    return 0;
  }
  const combinations = new Array(buckets + 1).fill(0).map(() => new Array(buckets + 1).fill(0));
  combinations[0][0] = 1;
  // 最大测试轮数
  const iterations = Math.floor(minutesToTest / minutesToDie);
  // 实际轮数可以理解为  iterations都喝 加一次不喝
  const f = new Array(buckets).fill(0).map(() => new Array(iterations + 1).fill(0));
  for (let i = 0; i < buckets; i++) {
    f[i][0] = 1;
  }
  for (let j = 0; j <= iterations; j++) {
    f[0][j] = 1;
  }
  for (let i = 1; i < buckets; i++) {
    combinations[i][0] = 1;
    combinations[i][i] = 1;
    for (let j = 1; j < i; j++) {
      combinations[i][j] = combinations[i - 1][j - 1] + combinations[i - 1][j];
    }
    for (let j = 1; j <= iterations; j++) {
      for (let k = 0; k <= i; k++) {
        f[i][j] += f[k][j - 1] * combinations[i][i - k];
      }
    }
    if (f[i][iterations] >= buckets) {
      return i;
    }
  }
  return 0;
};

// 题解: https://leetcode-cn.com/problems/poor-pigs/solution/hua-jie-suan-fa-458-ke-lian-de-xiao-zhu-by-guanpen/

// pow(base, ans) >= buckets,   =>  ans >= log(buckets) / log(base) 取整 ans = ceil(log(buckets) / log(base))

/**
 * 
一只小猪代表一个维度(设为n), 每只小猪可以测试的次数+1为这只小猪在本维度上可以确定的点的数量(设为s), 则组成的n维空间中的总的点的数量为 s^n .

小猪喝水策略: 把所有的水桶排成一个n维的n方体, 每只小猪喝垂直于本维度(轴)的一个"超平面".

如2只小猪, 5个点. 25桶水排成一个矩形, 一只喝行, 一只喝列. 2只小猪确定一个点(***).

如3只小猪, 5个点. 125桶水排成一个立方体, 一只喝垂直于x轴的面, 一只喝垂直于y轴的面, 一只喝垂直于z轴的面. 3只小猪确定一个点(***).

如n只小猪, 5个点. 5^n桶水排成一个n方体, 每只喝垂直于本维度的一个"超平面"上的所有的水. n只小猪确定n维空间中的一个点(***).
 */

var poorPigs = function (buckets, minutesToDie, minutesToTest) {
  const times = minutesToTest / minutesToDie;
  const base = times + 1;
  // base ^ ans >= buckets
  // ans >= log(buckets) / log(base)
  const temp = Math.log(buckets) / Math.log(base);
  const ans = Math.ceil(temp);
  return ans;
};
