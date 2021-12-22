/**
 * 
用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

 

示例 1：

输入：
["CQueue","appendTail","deleteHead","deleteHead"]
[[],[3],[],[]]
输出：[null,null,3,-1]
示例 2：

输入：
["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
[[],[],[5],[2],[],[]]
输出：[null,-1,null,null,5,2]
提示：

1 <= values <= 10000
最多会对 appendTail、deleteHead 进行 10000 次调用

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

// 栈 push,pop
var CQueue = function () {
    this.store = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
    this.store.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
    if (this.store.length === 0) {
        return -1;
    }
    let tmp = [];
    while (this.store.length) {
        tmp.push(this.store.pop());
    }
    let value = tmp.pop();
    while (tmp.length) {
        this.store.push(tmp.pop());
    }
    return value;
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */

// 栈 push,pop
var CQueue = function () {
    this.store = [];
    this.tmp = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
    this.store.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
    // 不用每次都把结果 存放回store中
    if (this.tmp.length === 0) {
        while (this.store.length) {
            this.tmp.push(this.store.pop());
        }
    }
    if (this.tmp.length === 0) {
        return -1;
    }
    return this.tmp.pop();
};
