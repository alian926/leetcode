/**
 * 
给定一个 N 叉树，找到其最大深度。

最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。

N 叉树输入按层序遍历序列化表示，每组子节点由空值分隔（请参见示例）。

 

示例 1：



输入：root = [1,null,3,2,4,null,5,6]
输出：3
示例 2：



输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
输出：5
 

提示：

树的深度不会超过 1000 。
树的节点数目位于 [0, 104] 之间。
 */

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

function Node(val, children) {
	this.val = val;
	this.children = children;
}
/**
 * @param {Node|null} root
 * @return {number}
 */
// 在leetcode上提交不通过, 但是没有检查出哪里有问题
var maxDepth = function (root) {
	if (!root) return 0;
	return (
		1 +
		(root.children
			? Math.max(...root.children.map((child) => maxDepth(child)))
			: 0)
	);
};

// DFS
var maxDepth = function (root) {
	if (!root) {
		return 0;
	}
	let maxChildDepth = 0;
	const children = root.children;
	for (const child of children) {
		const childDepth = maxDepth(child);
		maxChildDepth = Math.max(maxChildDepth, childDepth);
	}
	return maxChildDepth + 1;
};


// BFS
var maxDepth = function (root) {
	if (!root) return 0;
	const queue = [];
	queue.push(root);
	let ans = 0;
	while (queue.length) {
		let size = queue.length;
		while (size > 0) {
			const node = queue.shift();
			const children = node.children;
			for (const child of children) {
				queue.push(child);
			}
			size--;
		}
		ans++;
	}
	return ans;
};
