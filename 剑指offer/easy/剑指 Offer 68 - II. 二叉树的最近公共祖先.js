/**
 * 
给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]



 

示例 1:

输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
示例 2:

输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
 

说明:

所有节点的值都是唯一的。
p、q 为不同节点且均存在于给定的二叉树中。
注意：本题与主站 236 题相同：https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

 var lowestCommonAncestor = function (root, p, q) {
    const pParents = [];
    const qParents = [];
    const d = (node, target, store) => {
        if (node) {
            // 自己也是自己的祖先
            if (node === target) {
                store.push(node);
                return true;
            }
            const tag =
                d(node.left, target, store) || d(node.right, target, store);
            // 找到是父节点的存入结果
            if (tag) {
                store.push(node);
            }
            return tag;
        }
        return false;
    };
    // 最近的在最前
    d(root, p, pParents);
    d(root, q, qParents);
    for (let target of qParents) {
        if (pParents.includes(target)) {
            return target;
        }
    }
    return null;
};

var lowestCommonAncestor = function (root, p, q) {
    let ans=null;
    const dfs = (root, p, q) => {
        if (root === null) return false;
        const lson = dfs(root.left, p, q);
        const rson = dfs(root.right, p, q);
        if (
            (lson && rson) ||
            ((root.val === p.val || root.val === q.val) && (lson || rson))
        ) {
            ans = root;
        }
        return lson || rson || root.val === p.val || root.val === q.val;
    };
    dfs(root, p, q);
    return ans;
};
