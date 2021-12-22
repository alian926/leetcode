/**
 * 
定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

 

示例:

MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.min();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.min();   --> 返回 -2.
 

提示：

各函数的调用总次数不超过 20000 次

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * initialize your data structure here.
 */
var MinStack = function () {};

/**
 * @param {number} x
 * @return {void}
 */
var MinStack = function () {
    this.store = [];
    this.minStore = [Infinity];
};

MinStack.prototype.push = function (x) {
    this.store.push(x);
    this.minStore.push(Math.min(this.minStore[this.minStore.length - 1], x));
};

MinStack.prototype.pop = function () {
    this.store.pop();
    this.minStore.pop();
};

MinStack.prototype.top = function () {
    return this.store[this.store.length - 1];
};

MinStack.prototype.min = function () {
    return this.minStore[this.minStore.length - 1];
};
/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
