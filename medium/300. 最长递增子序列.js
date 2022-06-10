/**
 * 
给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

 
示例 1：

输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
示例 2：

输入：nums = [0,1,0,3,2,3]
输出：4
示例 3：

输入：nums = [7,7,7,7,7,7,7]
输出：1
 

提示：

1 <= nums.length <= 2500
-104 <= nums[i] <= 104
 

进阶：

你可以设计时间复杂度为 O(n2) 的解决方案吗？
你能将算法的时间复杂度降低到 O(n log(n)) 吗?
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS1 = function (nums) {
    let tails = Array(nums.length).fill(0);
    let res = 0;
    for (let key in nums) {
        let left = 0,
            right = res;
        while (left < right) {
            let mid = (left + right) >> 1;
            if (tails[mid] < nums[key]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        tails[left] = nums[key];
        if (right === res) {
            res += 1;
        }
    }
    return res;
};

var lengthOfLIS2 = function (nums) {
    let len = nums.length;
    if (!len) return 0;
    let dep = Array(len).fill(1);
    for (let i in nums) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dep[i] = Math.max(dep[i], dep[j] + 1);
            }
        }
    }
    return Math.max(...dep);
};

// // VUE3 实现
var lengthOfLIS3 = function (arr) {
    // p 里面的内容无所谓, 记录的有效值是索引,当前下标的值是上一个值的索引
    const p = arr.slice();
    // result存储的是结果的索引, 默认放入第一项
    const result = [0];
    let i, j, u, v, c;
    // 数组长度
    const len = arr.length;
    for (i = 0; i < len; i++) {
        // 第i项
        const arrI = arr[i];
        //  第i项的值不能是0
        if (arrI !== 0) {
            // j是结果索引数组的最后一项
            j = result[result.length - 1];
            // 第i项比结果数组中的最后一项大,存入结果
            if (arr[j] < arrI) {
                // 记录i位置对应的前一项的索引
                p[i] = j;
                // 结果索引数组放入i
                result.push(i);
                // 下一轮循环
                continue;
            }
            // 如果第i项小于j,进行下面操作
            // u,v为结果数组的起始点和结尾点
            u = 0;
            v = result.length - 1;
            // 循环 起始点小于结尾点
            while (u < v) {
                // c是中点, 二分查找
                c = (u + v) >> 1;
                // arrI大于中点, 起始点右移,赋值中值+1
                if (arr[result[c]] < arrI) {
                    u = c + 1;
                } else {
                    // 结尾点左移,赋值中值
                    v = c;
                }
            }
            // 第i值 依旧小于目标中值, 相同或者更大就不需要更换
            if (arrI < arr[result[u]]) {
                // 起点大于0
                if (u > 0) {
                    // 将它替换的前一项记住
                    p[i] = result[u - 1];
                }
                // 更新目标值下标结果 为 i
                result[u] = i;
            }
        }
    }
    // u是结果数组长度, v是结果最后一项
    u = result.length;
    v = result[u - 1];
    // 回溯数组p, 依次找到最终的索引
    while (u-- > 0) {
        // 重新组织结果
        result[u] = v;
        v = p[v];
    }
    // return result;
    // return result.map((item, index) => arr[item]);
    return result.length;
};

console.log('ans', lengthOfLIS2([10, 9, 2, 5, 3, 7, 101, 18]));
