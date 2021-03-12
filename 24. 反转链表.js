/*定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

 

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
 

限制：

0 <= 节点个数 <= 5000
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
//基础双指针法指针
var reverseList = function(head) {
    //边界判断
    if(!head || !head.next) {
        return head
    }
    let pre=null,current=head,next;
    while(current) {
        next = current.next;
        current.next = pre;
        pre = current;
        current = next;
    }
    return pre;
};
//递归,找到最后一个开始往回计算,让原来后面的节点指向自己,自己指向空
var reverseList = function(head) {
    if(!head || !head.next) {
        return head
    }
    let res = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return res;
}
//妖魔化的双指针,获取当前指针的位置,再修改头指针的指向,一直后移
var reverseList = function(head) {
    if(!head) return head;
    let cur = head;
    while(head.next) {
        let t = head.next.next;
        head.next.next = cur;
        cur = head.next;
        head.next = t;
    }
    return cur;
}