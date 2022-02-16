/**
 * 
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

 

示例 1：

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
示例 2：

输入：nums = [0]
输出：[[],[0]]
 

提示：

1 <= nums.length <= 10
-10 <= nums[i] <= 10
nums 中的所有元素 互不相同

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/subsets
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    let ans = [[]];
    let tmp = [];
    const d = (list) => {
        list.forEach((v,i) => {
            tmp.push(v);
            ans.push(tmp.slice());
            d(list.slice(i+1));
            tmp.pop();
        })
    }
    d(nums)
    return ans;
};

/*
记原序列中元素的总数为 n。原序列中的每个数字 a_i的状态可能有两种，即「在子集中」和「不在子集中」。我们用 1 表示「在子集中」，0 表示不在子集中，那么每一个子集可以对应一个长度为 n 的 0/1 序列，第 i 位表示 a_i是否在子集中
*/
var subsets = function(nums) {
    const ans = [];
    const n = nums.length;
    // 1 << n 即 2^n
    for (let mask = 0; mask < (1 << n); ++mask) {
        const t = [];
        for (let i = 0; i < n; ++i) {
            // mask情况下 第i位是否为1
            if (mask & (1 << i)) {
                t.push(nums[i]);
            }
        }
        ans.push(t);
    }
    return ans;
};

var subsets = function(nums) {
    const t = [];
    const ans = [];
    const dfs = (cur) => {
        if (cur === nums.length) {
            ans.push(t.slice());
            return;
        }
        t.push(nums[cur]);
        dfs(cur + 1);
        t.pop();
        dfs(cur + 1);
    }
    dfs(0);
    return ans;
};


console.log(subsets([1,2,3]))
console.log(subsets([0]))