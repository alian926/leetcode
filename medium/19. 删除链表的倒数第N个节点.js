/**  
 * 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：

给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
说明：

给定的 n 保证是有效的。

进阶：

你能尝试使用一趟扫描实现吗？
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
	let current = head;
	let bags = [];
	while (current) {
		bags.push(current);
		current = current.next;
	}
	let needRmIndex = bags.length - n;
	// [1],1 [1,2] 2 删除的是头结点的情况 
	if (needRmIndex === 0) {
		return head.next;
	}
	bags[needRmIndex - 1].next = bags[needRmIndex + 1] || null;
	return head;
};
