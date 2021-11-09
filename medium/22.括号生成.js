/**
 *
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

有效括号组合需满足：左括号必须以正确的顺序闭合。

 

示例 1：

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
示例 2：

输入：n = 1
输出：["()"]
 

提示：

1 <= n <= 8
 */

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
	const L = '(',
		R = ')';
	const ret = [];
	function dfs(model, left, right) {
		if (model.length == n * 2) {
			ret.push(model.join(''));
		}
		if (left < n) {
			model.push(L);
			dfs(model, left + 1, right);
			model.pop();
		}
		if (right < left) {
			model.push(R);
			dfs(model, left, right + 1);
			model.pop();
		}
	}
	dfs([], 0, 0);
	return ret;
};

var generateParenthesis = function (n) {
	const ret = [];
	function dfs(str, left, right) {
		if (str.length == n * 2) {
			ret.push(str);
		}
		if (left < n) {
			dfs(str + '(', left + 1, right);
		}
		if (right < left) {
			dfs(str + ')', left, right + 1);
		}
	}
	dfs([], 0, 0);
	return ret;
};
