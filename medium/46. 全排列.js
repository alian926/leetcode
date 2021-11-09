/** 
 * 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
 * 输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
 */

 /**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const result = [];
    const used = {};
    dfs([]);
    function dfs(path) {
        if(path.length == nums.length) {
            //此处必须穿入新的数组,由于js语言特性,都是浅拷贝,操作的都是同一个path,会被覆盖
            return result.push(path.slice())
        }
        for(let n of nums) {
            //使用used, 用空间换时间,查找比includes遍历快
            if(used[n]) {
                continue;
            }
            path.push(n);
            used[n] = true;
            dfs(path);
            path.pop();
            used[n] = false;
        }
    }
    return result;
};
