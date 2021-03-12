/** 
 * 反转一个单链表。

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
进阶:
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 迭代方法
var reverseList = function (head) {
    if(!head) return head
    let currentNode = head;
    let nextNode = head.next
    head.next = null
    while(nextNode) {
        let temp = nextNode.next
        nextNode.next = currentNode
        currentNode = nextNode
        nextNode = temp 
    }
    return currentNode
};
// 递归 1 2 3
var reverseList = function (head) {
    if(!head || !head.next) {
        return head
    }
    let result = reverseList(head.next)
    head.next.next = head
    head.next = null
    return result
};