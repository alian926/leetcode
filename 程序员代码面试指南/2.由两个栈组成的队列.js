/**
 * 由两个栈组成的队列
 * 题目:
 * 编写一个类,用两个栈实现队列,支持队列的基本操作(add,poll,peek)
 * 难度:
 * ⭐️⭐️
 */


class TwoStackQueue {
    constructor() {
        this.stackPush = [];
        this.stackPop = [];
    }
    pushToPop() {
        if(this.stackPop.length === 0) {
            while(this.stackPush.length !== 0) {
                this.stackPop.push(this.stackPush.pop());
            }
        }
    }
    add(newNum) {
        this.stackPush.push(newNum);
        this.pushToPop();
    }
    poll() {
        if(this.stackPop.length === 0 && this.stackPush.length === 0) {
            throw new Error('Queue is Empty')
        }
        pushToPop();
        return this.stackPop.pop();
    }
    peek() {
        if(this.stackPop.length === 0 && this.stackPush.length === 0) {
            throw new Error('Queue is Empty')
        }
        pushToPop();
        return this.stackPop[this.stackPop.length - 1];
    }
}