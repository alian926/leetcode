/**
 * 
给你两个字符串 s 和 goal ，只要我们可以通过交换 s 中的两个字母得到与 goal 相等的结果，就返回 true ；否则返回 false 。

交换字母的定义是：取两个下标 i 和 j （下标从 0 开始）且满足 i != j ，接着交换 s[i] 和 s[j] 处的字符。

例如，在 "abcd" 中交换下标 0 和下标 2 的元素可以生成 "cbad" 。
 

示例 1：

输入：s = "ab", goal = "ba"
输出：true
解释：你可以交换 s[0] = 'a' 和 s[1] = 'b' 生成 "ba"，此时 s 和 goal 相等。
示例 2：

输入：s = "ab", goal = "ab"
输出：false
解释：你只能交换 s[0] = 'a' 和 s[1] = 'b' 生成 "ba"，此时 s 和 goal 不相等。
示例 3：

输入：s = "aa", goal = "aa"
输出：true
解释：你可以交换 s[0] = 'a' 和 s[1] = 'a' 生成 "aa"，此时 s 和 goal 相等。
示例 4：

输入：s = "aaaaaaabc", goal = "aaaaaaacb"
输出：true
 

提示：

1 <= s.length, goal.length <= 2 * 104
s 和 goal 由小写英文字母组成
 */

/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
// 超出时间限制了
var buddyStrings = function (s, goal) {
	if (s.length !== goal.length) return false;
	for (let i = 0; i < s.length - 1; i++) {
		for (let j = i + 1; i < s.length; j++) {
			if (swap(s, i, j) === goal) {
				return true;
			}
		}
	}
	return false;
};

var swap = function (str, i, j) {
	let arr = str.split('');
	[arr[i], arr[j]] = [arr[j], arr[i]];
	return arr.join('');
};

var buddyStrings = function (s, goal) {
	if (s.length !== goal.length) return false;
	let sArr = s.split('');
	let gArr = goal.split('');
	let store = [];
	let chars = new Map();
	let sameChar = false;
	for (let i = 0; i < s.length; i++) {
		if (sArr[i] !== gArr[i]) {
			store.unshift(sArr[i]);
			store.push(gArr[i]);
			if (store.length > 4) return false;
		} else {
			if (chars.has(sArr[i])) {
				sameChar = true;
			} else {
				chars.set(sArr[i], i);
			}
		}
	}
	if (store.length === 0) {
		return sameChar;
	} else if (store.length === 4) {
		return store[0] === store[2] && store[1] === store[3];
	}
	return false;
};

// 官方题解
var buddyStrings = function (s, goal) {
	if (s.length != goal.length) return false;

	if (s === goal) {
		let store = new Map();
		for (let c of s) {
			if (store.has(c)) {
				return true;
			} else {
				store.set(c, true);
			}
		}
    return false
	} else {
		let first = -1,
			second = -1;
		for (let i = 0; i < s.length; i++) {
			if (s[i] !== goal[i]) {
				if (first === -1) first = i;
				else if (second === -1) second = i;
        // 再有超出的字符则无法匹配
				else return false;
			}
		}

    // second !== -1保证有两个不同的字符
		return (
			second !== -1 && s[first] === goal[second] && s[second] === goal[first]
		);
	}
};

console.log(buddyStrings('aa', 'aa'));
