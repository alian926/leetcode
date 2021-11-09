/**
 * 
给定一个无重复元素的正整数数组 candidates 和一个正整数 target ，找出 candidates 中所有可以使数字和为目标数 target 的唯一组合。

candidates 中的数字可以无限制重复被选取。如果至少一个所选数字数量不同，则两种组合是唯一的。 

对于给定的输入，保证和为 target 的唯一组合数少于 150 个。

 

示例 1：

输入: candidates = [2,3,6,7], target = 7
输出: [[7],[2,2,3]]
示例 2：

输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]
示例 3：

输入: candidates = [2], target = 1
输出: []
示例 4：

输入: candidates = [1], target = 1
输出: [[1]]
示例 5：

输入: candidates = [1], target = 2
输出: [[1,1]]
 

提示：

1 <= candidates.length <= 30
1 <= candidates[i] <= 200
candidate 中的每个元素都是独一无二的。
1 <= target <= 500
 */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
	const res = [];
	const dfs = (start, temp, sum) => {
		// start是当前选择的起点索引 temp是当前的集合 sum是当前求和
		if (sum >= target) {
			if (sum == target) {
				res.push(temp.slice()); // temp的拷贝 加入解集
			}
			return; // 结束当前递归
		}
		for (let i = start; i < candidates.length; i++) {
			// 枚举当前可选的数，从start开始
			temp.push(candidates[i]); // 选这个数
			dfs(i, temp, sum + candidates[i]); // 基于此继续选择，传i，下一次就不会选到i左边的数
			temp.pop(); // 撤销选择，回到选择candidates[i]之前的状态，继续尝试选同层右边的数
		}
	};
	dfs(0, [], 0); // 最开始可选的数是从第0项开始的，传入一个空集合，sum也为0
	return res;
};