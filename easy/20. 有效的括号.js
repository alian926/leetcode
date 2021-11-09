/**
 * 
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

 */

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let stack = [];
    let leftArr = ['(','{','['];
    let rightArr = [')','}',']'];
    for(let i=0,len=s.length; i<len; i++) {
        if(leftArr.includes(s[i])) {
            stack.push(s[i])
        }else {
            if(leftArr.indexOf(stack.pop()) == rightArr.indexOf(s[i])) {
                continue;
            }
            return false;
        }
    }
    if(stack.length == 0) {
        return true;
    }else {
        return false;
    }
};

var isValid = function(s) {
    let stack = [];
    let braceMap = {
        '(': ')',
        '{': '}',
        '[': ']'
    }
    for(let i=0,len=s.length; i<len; i++) {
        if(braceMap[s[i]]) {
            stack.push(s[i])
        }else {
            if(braceMap[stack.pop()] == s[i]) {
                continue;
            }
            return false;
        }
    }
    return stack.length == 0;
};