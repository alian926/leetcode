/* 
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807 
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
//参考解析
function ListNode(val, next = null) {
	this.val = val;
	this.next = next;
}
var addTwoNumbers = function (l1, l2) {
	const headNode = new ListNode('head');
  // //头节点不做考虑,从第一个next开始计数
	let tmp = headNode;
	let add = 0;
	let sum = 0;
	while (l1 || l2) {
		sum = l1?.val ?? 0 + l2?.val ?? 0 + add;
		tmp.next = new ListNode(sum % 10);
		add = sum >= 10 ? 1 : 0;
		l1 = l1?.next;
		l2 = l2?.next;
		tmp = tmp.next;
	}
	add && (tmp.next = new ListNode(add));
	return headNode.next;
};
[2, 4, 3];
[5, 6, 4];
[7, 0, 8];
console.log(
	addTwoNumbers(
		{ val: 2, next: { val: 4, next: { val: 3, next: null } } },
		{ val: 5, next: { val: 6, next: { val: 4, next: null } } }
	)
);
