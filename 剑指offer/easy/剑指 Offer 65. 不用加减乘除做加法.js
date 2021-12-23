/**
 * 
写一个函数，求两个整数之和，要求在函数体内不得使用 “+”、“-”、“*”、“/” 四则运算符号。

 

示例:

输入: a = 1, b = 1
输出: 2
 

提示：

a, b 均可能是负数或 0
结果不会溢出 32 位整数

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var add = function (a, b) {
    while (b != 0) {
        // 当进位为 0 时跳出
        let c = (a & b) << 1; // c = 进位
        a ^= b; // a = 非进位和
        b = c; // b = 进位
    }
    return a;
};

// print(hex(1)) # = 0x1 补码
// print(hex(-1)) # = -0x1 负号 + 原码 （ Python 特色，Java 会直接输出补码）

// print(hex(1 & 0xffffffff)) # = 0x1 正数补码
// print(hex(-1 & 0xffffffff)) # = 0xffffffff 负数补码

// print(-1 & 0xffffffff) # = 4294967295 （ Python 将其认为正数）
