/**
 * 
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

 

示例 1：

输入：strs = ["flower","flow","flight"]
输出："fl"
示例 2：

输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。
 

提示：

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] 仅由小写英文字母组成
*/

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    const len = Math.min(...strs.map(str => str.length));
    let ans = '';
    for (let i = 0; i < len; i++) {
        if (
            strs
                .map(str => str[i])
                .every((v, i, arr) => {
                    return v == arr[0];
                })
        ) {
            ans += strs[0][i];
        } else {
            break;
        }
    }
    return ans;
};

console.log(longestCommonPrefix(['flower', 'flow', 'flight']));
