/**
 * 
从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

 

例如:
给定二叉树: [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回其层次遍历结果：

[
  [3],
  [9,20],
  [15,7]
]
 

提示：

节点总数 <= 1000
注意：本题与主站 102 题相同：https://leetcode-cn.com/problems/binary-tree-level-order-traversal/

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof
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
 * @return {number[][]}
 */

// bfs
var levelOrder = function (root) {
    let queue = root ? [root] : [];
    const ans = [];
    while (queue.length) {
        ans.push(queue.map(l => l.val));
        const len = queue.length;
        const tmp = [];
        for (let i = 0; i < len; i++) {
            if (queue[i].left) tmp.push(queue[i].left);
            if (queue[i].right) tmp.push(queue[i].right);
        }
        queue = tmp;
    }
    return ans;
};

// dfs
var levelOrder = function (root) {
    const ans = [];
    const dfs = (root, level) => {
        if (root) {
            if (!ans[level]) {
                ans[level] = [];
            }
            ans[level].push(root.val);
            dfs(root.left, level + 1);
            dfs(root.right, level + 1);
        }
    };
    dfs(root, 0);
    return ans;
};
