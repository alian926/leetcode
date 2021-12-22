/**
 * 
把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。

给你一个可能存在 重复 元素值的数组 numbers ，它原来是一个升序排列的数组，并按上述情形进行了一次旋转。请返回旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一次旋转，该数组的最小值为1。  

示例 1：

输入：[3,4,5,1,2]
输出：1
示例 2：

输入：[2,2,2,0,1]
输出：0
注意：本题与主站 154 题相同：https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/

通过次数289,254提交次数587,490

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
    let low = 0;
    let high = numbers.length - 1;
    while (low < high) {
        const pivot = low + Math.floor((high - low) / 2);
        if (numbers[pivot] < numbers[high]) {
            // numbers[pivot] 是最小值右侧的元素, 缩小high
            high = pivot;
        } else if (numbers[pivot] > numbers[high]) {
            // 最小值在pivot的右侧,忽略左侧区间, low+1
            low = pivot + 1;
        } else {
            // 值相同的时候, 不能莽撞的忽略区间, 但是由于值相同可以省略high的一位,
            high -= 1;
        }
    }
    return numbers[low];
};

var minArray = function (numbers) {
    let left = 0,
        right = numbers.length - 1;
    while (left < right) {
        let middle = left + Math.floor((right - left) / 2);
        if (numbers[middle] < numbers[right]) {
            right = middle;
        } else if (numbers[middle] > numbers[right]) {
            left = middle + 1;
        } else {
            right -= 1;
        }
    }
    return numbers[left];
};
console.log(minArray([1]));
console.log(minArray([10, 1, 10, 10, 10]));
console.log(minArray([1, 3, 5]));
console.log(minArray([3, 1, 3]));
console.log(minArray([3, 1]));
console.log(minArray([3, 4, 5, 1, 2]));
console.log(minArray([2, 2, 2, 0, 1]));
