/**
 * 给定一个仅包含大小写字母和空格 ' ' 的字符串 s，返回其最后一个单词的长度。如果字符串从左向右滚动显示，那么最后一个单词就是最后出现的单词。

如果不存在最后一个单词，请返回 0 。

说明：一个单词是指仅由字母组成、不包含任何空格字符的 最大子字符串。

 

示例:

输入: "Hello World"
输出: 5
 */

 /**
 * @param {string} s
 * @return {number}
 */
// js方法
var lengthOfLastWord = function(s) {
    s = s.trim()
    let idx = s.lastIndexOf(' ')
    return s.slice(idx+1).length
};

// 从右向左遍历
var lengthOfLastWord = function(s) {
    let result = 0
    // 存在字符两边是空白的情况
    let tag = false;
    for(let i=s.length-1; i>=0; i--) {
        if(s[i] != ' ') {
            tag = true;
            result++
        }else if(tag) {
            break
        }
    }
    return result
}