/**
 * 
给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。

换句话说，s1 的排列之一是 s2 的 子串 。

 

示例 1：

输入：s1 = "ab" s2 = "eidbaooo"
输出：true
解释：s2 包含 s1 的排列之一 ("ba").
示例 2：

输入：s1= "ab" s2 = "eidboaoo"
输出：false
 

提示：

1 <= s1.length, s2.length <= 104
s1 和 s2 仅包含小写字母
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
// 'abc'  'avbaeacbf'
var checkInclusion = function (s1, s2) {
	const n = s1.length,
		m = s2.length;
	if (n > m) return false;

	const cnt1 = new Array(26).fill(0);
	const cnt2 = new Array(26).fill(0);
	// 通过数字的形式磨平字符串位置的差异
	for (let i = 0; i < n; ++i) {
		++cnt1[charCodeNum(s1[i])];
		++cnt2[charCodeNum(s2[i])];
	}
	if (cnt1.toString() === cnt2.toString()) {
		return true;
	}
	for (let i = n; i < m; ++i) {
		++cnt2[charCodeNum(s2[i])];
		--cnt2[charCodeNum(s2[i - n])];
		if (cnt1.toString() === cnt2.toString()) {
			return true;
		}
	}
	return false;
};

var checkInclusion = function (s1, s2) {
	const n = s1.length,
		m = s2.length;
	if (n > m) return false;

	const cnt = new Array(26).fill(0);
	for (let s of s1) {
		--cnt[charCodeNum(s)];
	}
	for (let left = 0, right = 0; right < m; ++right) {
		const x = charCodeNum(s2[right]);
		++cnt[x];
		while (cnt[x] > 0) {
			--cnt[charCodeNum(s2[left])];
			++left;
		}
		if (right - left + 1 === n) {
			return true;
		}
	}
	return false;
};
var charCodeNum = function (c) {
	return c.charCodeAt() - 'a'.charCodeAt();
};
