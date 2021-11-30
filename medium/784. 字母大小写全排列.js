/**
 * 
给定一个字符串S，通过将字符串S中的每个字母转变大小写，我们可以获得一个新的字符串。返回所有可能得到的字符串集合。

 

示例：
输入：S = "a1b2"
输出：["a1b2", "a1B2", "A1b2", "A1B2"]

输入：S = "3z4"
输出：["3z4", "3Z4"]

输入：S = "12345"
输出：["12345"]
 

提示：

S 的长度不超过12。
S 仅由数字和字母组成。
 */
/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  let result = [];
  /**
   *
   * @param {*} index 开始索引
   * @param {*} path 已选择的路径
   */
  const dfs = (index, path) => {
    // 对于path而言  如果遇到是数字的话，就直接加入，忽略大小写的转换了
    while (!isNaN(s[index])) {
      path += s[index++];
    }
    // 结束条件，如果已选择的长度达到目标路径的长度，则加入结果集中
    if (path.length == s.length) {
      return result.push(path);
    }
    // 递归下一个，把当前大小写都试一遍
    dfs(index + 1, path + s[index].toLowerCase());
    dfs(index + 1, path + s[index].toUpperCase());
  };
  dfs(0, '');
  return result;
};
