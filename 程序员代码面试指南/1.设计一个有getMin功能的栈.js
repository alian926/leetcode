/**
 * 设计一个有getMin功能的栈
 * 题目: 实现一个特殊的栈,在实现栈的基本功能的基础上,再实现返回栈中最小元素的操作.
 * 要求:
 * 1.pop, push, getMin操作的时间复杂度都是O(1)
 * 2.设计的栈类型可以使用现成的栈结构
 * 难度:
 * ⭐️
 * 解答:
 * 在设计时,我们使用两个栈,一个栈用来保存当前栈中的元素,其功能和一个正常的栈没有区别,这个栈记为stackData;另一个栈用于保存每一步的最小值,这个栈记为stackMin.
 */

// 压入数据规则实现, stackMin在压入的时候节省空间,弹出的时候需要多判断
class MyStack1 {
    constructor() {
        this.stackData = [];
        this.stackMin = [];
    }
    push(newNum) {
        if(this.stackData.length === 0) {
            this.stackMin.push(newNum);
        }else if(this.getMin() < newNum) {
            this.stackMin.push(minValue);
        }
        this.stackData.push(newNum);

    }
    pop() {
        if(this.stackData.length === 0) {
            throw Error("Your stack is empty")
        }
        let value = this.stackData.pop();
        if(value === this.getMin()) {
            this.stackMin.pop();
        }
        return this.stackData.pop();
    }
    getMin() {
        if(this.stackMin.length === 0) {
            throw new Error('Your stack is empty');
        }
        return this.stackMin[this.stackMin.length - 1];
    }
} 

// 弹出数据规则, stackMin在压入时费空间,弹出时节省时间
class MyStack2 {
    constructor() {
        this.stackData = [];
        this.stackMin = [];
    }
    push(newNum) {
        if(this.stackData.length === 0) {
            this.stackMin.push(newNum);
        }else {
            let minValue = Math.min(this.getMin(), newNum);
            this.stackMin.push(minValue);
        }
        this.stackData.push(newNum);

    }
    pop() {
        if(this.stackData.length === 0) {
            throw Error("Your stack is empty")
        }
        this.stackMin.pop();
        return this.stackData.pop();
    }
    getMin() {
        if(this.stackMin.length === 0) {
            throw new Error('Your stack is empty');
        }
        return this.stackMin[this.stackMin.length - 1];
    }
}