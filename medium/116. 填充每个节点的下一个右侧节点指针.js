/**
 * 
给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。

 

进阶：

你只能使用常量级额外空间。
使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
 

示例：



输入：root = [1,2,3,4,5,6,7]
输出：[1,#,2,3,#,4,5,6,7,#]
解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
 

提示：

树中节点的数量少于 4096
-1000 <= node.val <= 1000

 */
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

// 都会通过双层循环来 层层遍历

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  if (!root) return root;

  // 初始化队列同时将第一层节点加入队列中，即根节点
  const Q = [root];

  // 外层的 while 循环迭代的是层数
  while (Q.length > 0) {
    // 记录当前队列大小
    const size = Q.length;

    // 遍历这一层的所有节点
    for (let i = 0; i < size; i++) {
      // 从队首取出元素
      const node = Q.shift();

      // 连接
      if (i < size - 1) {
        node.next = Q[0];
      }

      // 拓展下一层节点
      if (node.left) {
        Q.push(node.left);
      }
      if (node.right) {
        Q.push(node.right);
      }
    }
  }

  // 返回根节点
  return root;
};

// 使用已经建立的next指针
var connect = function (root) {
  if (!root) return root;

  // 从根节点开始
  let leftmost = root;

  // 以每一个下一层的最左节点 为起点
  while (leftmost.left !== null) {
    // 遍历这一层节点组织成的链表，为下一层的节点更新 next 指针
    let head = leftmost;

    while (head !== null) {
      // 连接同一个父节点的两个子节点
      head.left.next = head.right;

      // 不同父亲的子节点之间建立连接
      if (head.next != null) {
        head.right.next = head.next.left;
      }

      // 指针向后移动, next为已经建立的同层间指向
      head = head.next;
    }

    // 去下一层的最左的节点
    leftmost = leftmost.left;
  }

  return root;
};
