/**
 * 
给定二叉搜索树（BST）的根节点和一个值。 你需要在BST中找到节点值等于给定值的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 NULL。

例如，

给定二叉搜索树:

        4
       / \
      2   7
     / \
    1   3

和值: 2
你应该返回如下子树:

      2     
     / \   
    1   3
在上述示例中，如果要找的值是 5，但因为没有节点值为 5，我们应该返回 NULL。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  if (!root) return null;
  if (root.val === val) {
    return root;
  } else {
    return searchBST(root.left, val) || searchBST(root.right, val);
  }
};

var searchBST = function (root, val) {
  if (!root) return null;
  let queue = [root];
  while (queue.length) {
    let node = queue.shift();
    if (node.val === val) return node;
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  return null;
};

var searchBST = function (root, val) {
  if (!root) {
    return null;
  }
  if (val === root.val) {
    return root;
  }
  // BST中  左节点 < 根节点 < 右节点
  return searchBST(val < root.val ? root.left : root.right, val);
};

var searchBST = function (root, val) {
  while (root) {
    if (val === root.val) {
      return root;
    }
    root = val < root.val ? root.left : root.right;
  }
  return null;
};

var searchBST = function (root, val) {
  if (!root) return null;
  let queue = [root];
  while (queue.length) {
    let node = queue.shift();
    if (node.val === val) return node;
    if (val < node.val) {
      node.left && queue.push(node.left);
    } else {
      node.right && queue.push(node.right);
    }
  }
  return null;
};
