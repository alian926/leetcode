/**
 * 
在仅包含 0 和 1 的数组 A 中，一次 K 位翻转包括选择一个长度为 K 的（连续）子数组，同时将子数组中的每个 0 更改为 1，而每个 1 更改为 0。

返回所需的 K 位翻转的最小次数，以便数组没有值为 0 的元素。如果不可能，返回 -1。

 

示例 1：

输入：A = [0,1,0], K = 1
输出：2
解释：先翻转 A[0]，然后翻转 A[2]。
示例 2：

输入：A = [1,1,0], K = 2
输出：-1
解释：无论我们怎样翻转大小为 2 的子数组，我们都不能使数组变为 [1,1,1]。
示例 3：

输入：A = [0,0,0,1,0,1,1,0], K = 3
输出：3
解释：
翻转 A[0],A[1],A[2]: A变成 [1,1,1,1,0,1,1,0]
翻转 A[4],A[5],A[6]: A变成 [1,1,1,1,1,0,0,0]
翻转 A[5],A[6],A[7]: A变成 [1,1,1,1,1,1,1,1]
 

提示：

1 <= A.length <= 30000
1 <= K <= A.length
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

// 暴力解法 O(nk),每个子序列只会翻转一次, 从左到右遍历,遇到0值进行翻转, 在最后一段小于k长度的子序列中,仍然存在0, 则无法翻转成功, 返回-1
var minKBitFlips = function (nums, k) {
    const { length } = nums;
    let ans = 0;
    for (let i = 0; i < length; i++) {
        if (nums[i] === 0) {
            if (i + k > length) {
                return -1;
            }
            for (let j = 0; j < k; j++) {
                nums[i + j] ^= 1;
            }
            ++ans;
        }
    }
    if (nums[length - 1] === 0) {
    }
    return ans;
};

// 根据暴力解法进行优化, 不考虑翻转子数组中的数字,而是统计每个数字需要翻转的次数.
// 这可以使用 差分数组 : 暂定差分数组diff, 定义diff[0]=arr[0], diff[i]=arr[i]-arr[i-1](i!==0)
// 差分数组通过空间换时间,原数组的子序列 [1,5) 上全部+3, 不需要全部更改,只需要在差分数组上修改两个值 diff[1]+3, diff[5]-3
var minKBitFlips = function (nums, k) {
    const { length } = nums;
    // 差分数组 翻转的次数的差, 不去操作实际数组
    const diff = new Array(length + 1).fill(0);
    let ans = 0,
        revCnt = 0; // 翻转次数
    for (let i = 0; i < length; i++) {
        // 翻转次数是通过差分数组进行计算的, 进行累加
        revCnt += diff[i];
        // i的状态和前面元素的翻转次数的奇偶性有关, nums[i]的值加上翻转的次数和 偶数代表结果为0
        if ((nums[i] + revCnt) % 2 === 0) {
            if (i + k > length) {
                // 无法完成翻转了 返回-1
                return -1;
            }
            // 翻转次数加1
            ++ans;
            // 更新差分数组
            //  当前序列翻转+1
            ++revCnt;
            //  相邻序列-1
            --diff[i + k];
        }
    }
    return ans;
};

// // 模2下的加减法和和异或操作相同
var minKBitFlips = function (nums, k) {
    const { length } = nums;
    const diff = new Array(length + 1).fill(0);
    let ans = 0,
        revCnt = 0;
    for (let i = 0; i < length; i++) {
        // 模2下的加法和和异或操作相同
        revCnt ^= diff[i];
        // nums[i] ^ revCnt == 0 1翻转1次,0翻转0次 都需要进行重新翻转
        if (nums[i] === revCnt) {
            if (i + k > length) {
                return -1;
            }
            // 结果+1
            ++ans;
            // 更新差分数组
            revCnt ^= 1;
            diff[i + k] ^= 1;
        }
    }
    return ans;
};

// 节省空间，当遍历到位置 i 时，若能知道位置 i-k 上发生了翻转操作，便可以直接修改 revCnt，从而去掉  diff 数组。
var minKBitFlips = function (nums, k) {
    const { length } = nums;
    let ans = 0,
        revCnt = 0;
    for (let i = 0; i < length; i++) {
        // 发生过翻转, 修改revCnt,复原数组元素
        if (i >= k && nums[i - k] > 1) {
            revCnt ^= 1;
            nums[i - k] -= 2; // 复原数组元素，若允许修改数组 nums，则可以省略
        }
        // 相等表示结果为0 需要进行翻转
        if (nums[i] == revCnt) {
            if (i + k > length) {
                return -1;
            }
            ++ans;
            revCnt ^= 1;
            // 操作原数组记录翻转
            nums[i] += 2;
        }
    }
    return ans;
};
