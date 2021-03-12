/**
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：

输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
示例 2：

输入: "cbbd"
输出: "bb"
 */

 /**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let len=s.length;
    let ans = '';
    let dp = [];
    //let dp = Array(len).fill(Array(len).fill(0)) 这种创建二维数组的方式是错误的, 二层都指向了同一个区域
    for(let idx = 0; idx< len; idx++) {
        dp.push(Array(len).fill(false))
    }
    for(let dis=0; dis<len; dis++ ) {
        for(let i = 0; i + dis < len; i++) {
            let j = i + dis;
            if(dis == 0) {
                // 单个字母也是回文组合
                dp[i][j] = true;
            } else if (dis == 1) {
                //两个相同的情况下也是回文
                dp[i][j] = (s[i] == s[j])
            } else {
                dp[i][j] = (s[i] == s[j] && dp[i + 1][j - 1]);
            }
            if(dp[i][j] && dis + 1 > ans.length) {
                ans = s.substring(i, j + 1)
            }
        }
    }
    return ans;
};