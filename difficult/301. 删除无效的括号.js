/**
 * 
给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。

返回所有可能的结果。答案可以按 任意顺序 返回。

 

示例 1：

输入：s = "()())()"
输出：["(())()","()()()"]
示例 2：

输入：s = "(a)())()"
输出：["(a())()","(a)()()"]
示例 3：

输入：s = ")("
输出：[""]
 

提示：

1 <= s.length <= 25
s 由小写英文字母以及括号 '(' 和 ')' 组成
s 中至多含 20 个括号
 */

/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
    const helper = (str, start, lremove, rremove) => {
        // 没有需要移除的括号
        if (lremove === 0 && rremove === 0) {
            // 符合匹配规则存入答案
            if (isValid(str)) {
                ans.push(str);
            }
            return;
        }

        for (let i = start; i < str.length; i++) {
            // "()())()", )) 处理前后两个括号中的一个,结果一样,忽略
            if (i !== start && str[i] === str[i - 1]) {
                continue;
            }
            // 如果剩余的字符无法满足去掉的数量要求，直接返回
            if (lremove + rremove > str.length - i) {
                return;
            }
            // 尝试去掉一个左括号
            if (lremove > 0 && str[i] === '(') {
                helper(
                    str.substring(0, i) + str.substring(i+1),
                    i,
                    lremove - 1,
                    rremove
                );
            }
            // 尝试去掉一个右括号
            if (rremove > 0 && str[i] === ')') {
                helper(
                    str.substring(0, i) + str.substring(i+1),
                    i,
                    lremove,
                    rremove - 1
                );
            }
        }
    };

    const ans = [];
    let lremove = 0;
    let rremove = 0;

    // 统计需要移除的括号数量 lremove,rremove 均大于等于0
    for (const c of s) {
        if (c === '(') {
            lremove++;
        } else if (c === ')') {
            if (lremove === 0) {
                rremove++;
            } else {
                // 存在可匹配的,减少左括号移除数量
                lremove--;
            }
        }
    }
    helper(s, 0, lremove, rremove);
    return ans;
};

// 校验括号的合理性
const isValid = str => {
    let cnt = 0;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            cnt++;
        } else if (str[i] === ')') {
            cnt--;
            if (cnt < 0) {
                return false;
            }
        }
    }

    return cnt === 0;
};


var removeInvalidParentheses = function(s) {
    const ans = [];
    let currSet = new Set();

    currSet.add(s);
    while (true) {
        for (const str of currSet) {
            // 有符合条件的存入答案
            if (isValid(str)) {
                ans.push(str);
            }
        }
        // 当有答案时,即为最少需要删除情况
        if (ans.length > 0) {
            return ans;
        }
        const nextSet = new Set();
        for (const str of currSet) {
            for (let i = 0; i < str.length; i ++) {
                // 去除连续相同括号的情况, 结果相同, 手动剪枝
                if (i > 0 && str[i] === str[i - 1]) {
                    continue;
                }
                if (str[i] === '(' || str[i] === ')') {
                    // 尝试去除括号
                    nextSet.add(str.substring(0, i) + str.substring(i + 1));
                }
            }
        }
        currSet = nextSet;
    }
}