/**
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

 

示例：

输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4

 */

 /**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let head = new ListNode(0,null);
    let p = head;
    while(true) {
        if(!l1 || !l2) {
            break;
        }
        if(l1.val <= l2.val) {
            p.next = l1;
            p = l1;
            l1 = l1.next;
        }else {
            p.next = l2;
            p = l2;
            l2 = l2.next;
        }
    }
    if(l1) {
        p.next = l1
    }
    if(l2) {
        p.next = l2
    }
    return head.next;
};

var mergeTwoLists = function(l1, l2) {
    if(!l2) {
        return l1;
    }
    if(!l1) {
        return l2;
    }
    if(l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next,l2);
        return l1;
    }else {
        l2.next = mergeTwoLists(l1,l2.next);
        return l2;
    }
};