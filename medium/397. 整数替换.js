/**
 * 
给定一个正整数 n ，你可以做如下操作：

如果 n 是偶数，则用 n / 2替换 n 。
如果 n 是奇数，则可以用 n + 1或n - 1替换 n 。
n 变为 1 所需的最小替换次数是多少？

 

示例 1：

输入：n = 8
输出：3
解释：8 -> 4 -> 2 -> 1
示例 2：

输入：n = 7
输出：4
解释：7 -> 8 -> 4 -> 2 -> 1
或 7 -> 6 -> 3 -> 2 -> 1
示例 3：

输入：n = 4
输出：2
 

提示：

1 <= n <= 2^31 - 1

 */

/**
 * @param {number} n
 * @return {number}
 */
var integerReplacement = function (n) {
	if (n === 1) {
		return 0;
	}
	if (n % 2 === 0) {
		// 此处+1 进行了/2操作
		return 1 + integerReplacement(n / 2);
	}
	return (
		// 此处+2，进行了2步骤操作，/2 和 —1或+1
		2 +
		Math.min(
			// 由于 n 最大值是 2^31-1 如果直接+1会溢出
			integerReplacement(Math.floor(n / 2)),
			integerReplacement(Math.floor(n / 2) + 1)
		)
	);
};

// 在上面的算法上进行优化,避免重复值的递归
const memo = new Map([[1, 0]]);
var integerReplacement = function (n) {
	if (!memo.has(n)) {
		if (n % 2 === 0) {
			memo.set(n, 1 + integerReplacement(Math.floor(n / 2)));
		} else {
			memo.set(
				n,
				2 +
					Math.min(
						integerReplacement(Math.floor(n / 2)),
						integerReplacement(Math.floor(n / 2) + 1)
					)
			);
		}
	}
	return memo.get(n);
};

// 贪心算法
var integerReplacement = function (n) {
	let ans = 0;
	while (n !== 1) {
		if (n % 2 === 0) {
			++ans;
			n = n / 2;
			// 每步优先考虑的是得到的结果最好还是个偶数,这样可以直接除2变小不用再加减1
			// 即 除 4 的余数 是 1 或者 3
		} else if (n % 4 === 1) {
			ans += 2;
			// n--;
			// n = n / 2;
			n = Math.floor(n / 2);
		} else {
			// 当n===3的时候是特例,不适用先加1再除2,
			if (n === 3) {
				ans += 2;
				n = 1;
			} else {
				// 其余的余数是3的时候, 适用+1除2的方式
				ans += 2;
				// 防止溢出不能先+1再/2
				n = Math.floor(n / 2) + 1;
			}
		}
	}
	return ans;
};
