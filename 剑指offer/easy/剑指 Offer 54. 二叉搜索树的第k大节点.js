/**
 * 
给定一棵二叉搜索树，请找出其中第 k 大的节点的值。

 

示例 1:

输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 4
示例 2:

输入: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
输出: 4
 

限制：

1 ≤ k ≤ 二叉搜索树元素个数

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function (root, k) {
    let queue = root ? [root] : [];
    let arr = [];
    while (queue.length) {
        let len = queue.length;
        let tmp = [];
        for (let i = 0; i < len; i++) {
            arr.push(queue[i].val);
            if (queue[i].left) tmp.push(queue[i].left);
            if (queue[i].right) tmp.push(queue[i].right);
        }
        queue = tmp;
    }
    arr.sort((a, b) => b - a);
    return arr[k - 1];
};

var kthLargest = function (root, k) {
    var dfs = function (root) {
        if (root == null || k == 0) return;
        // 最右的节点是最大的
        // 通过右根左的顺序进行遍历
        dfs(root.right);
        if (--k == 0) res = root.val;
        dfs(root.left);
    };
    dfs(root);
    return res;
};
