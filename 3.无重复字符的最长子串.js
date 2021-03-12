/* 
    给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

" " 1
"aab" 2
"dvdf" 3
"aafwdddxgaw" 5
*/

/**
 * @param {string} s
 * @return {number}
 */
//第一种想法
// var lengthOfLongestSubstring = function(s) {
//     let store = [''];
//     let pointer = 0;
//     let max = 0;
//     s.split('').forEach( (value,index) => {
//         let repeatIndex = store[pointer].indexOf(value)
//         if(repeatIndex < 0) {
//             store[pointer] += value
//         }else {
//             let fragment = store[pointer].slice(repeatIndex + 1)
//             pointer += 1;
//             store[pointer] = fragment + value
//         }
//     })
//     store.forEach( arr => {
//         if(arr.length > max) {
//             max = arr.length
//         }
//     })
//     console.log(store)
//     return max
// };
//第二种想法,在第一种上改进了,加快执行速度
var lengthOfLongestSubstring = function(s) {
    let tmpStr = '';
    let max = 0;
    s.split('').forEach( (value,index) => {
        let repeatIndex = tmpStr.indexOf(value)
        if(repeatIndex < 0) {
            tmpStr += value
        }else {
            max < tmpStr.length && (max = tmpStr.length)
            let fragment =tmpStr.slice(repeatIndex + 1)
            tmpStr = fragment + value
        }
    })
    max < tmpStr.length && (max = tmpStr.length)
    return max
};
console.log(lengthOfLongestSubstring('bbbbb'))