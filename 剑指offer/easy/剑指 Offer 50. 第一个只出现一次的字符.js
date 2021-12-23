/**
 * 
在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

示例 1:

输入：s = "abaccdeff"
输出：'b'
示例 2:

输入：s = "" 
输出：' '
 

限制：

0 <= s 的长度 <= 50000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
    let set = new Set();
    let repeat = new Set();
    for (let ch of s) {
        if (set.has(ch)) {
            repeat.add(ch);
            set.delete(ch);
        }
        set.add(ch);
    }
    let ans = ' ';
    for (let val of set.values()) {
        if (!repeat.has(val)) {
            ans = val;
            break;
        }
    }
    return ans;
};

var firstUniqChar = function (s) {
    let store = new Map();
    for (let ch of s) {
        store.set(ch, (store.get(ch) || 0) + 1);
    }
    for (let ch of s) {
        if (store.get(ch) === 1) {
            return ch;
        }
    }
    return ' ';
};

// console.log(firstUniqChar(''));
console.log(firstUniqChar('leetcode'));
console.log(firstUniqChar('dddccdbba'));
