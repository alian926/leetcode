/**
 * 
给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]



 

示例 1:

输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
输出: 6 
解释: 节点 2 和节点 8 的最近公共祖先是 6。
示例 2:

输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
输出: 2
解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
 

说明:

所有节点的值都是唯一的。
p、q 为不同节点且均存在于给定的二叉搜索树中。
注意：本题与主站 235 题相同：https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof
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

// 二叉搜索数, 左<根<右
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
    const getPath = function (root, target) {
        let path = [];
        let node = root;
        while (node != target) {
            path.push(node);
            if (target.val < node.val) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        path.push(node);
        return path;
    };
    let pPath = getPath(root, p);
    let qPath = getPath(root, q);

    let ancestor = null;
    for (let i = 0; i < pPath.length && i < qPath.length; ++i) {
        if (pPath[i] == qPath[i]) {
            // 从上往下找祖先, 直到最后不相同的
            ancestor = pPath[i];
        } else {
            break;
        }
    }
    return ancestor;
};

// 合并成一次遍历
var lowestCommonAncestor = function (root, p, q) {
    // 如果两个节点有相同的组件, 则变化趋势是相同的
    var ancestor = root;
    while (true) {
        if (p.val < ancestor.val && q.val < ancestor.val) {
            ancestor = ancestor.left;
        } else if (p.val > ancestor.val && q.val > ancestor.val) {
            ancestor = ancestor.right;
        } else {
            break;
        }
    }
    return ancestor;
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
let root = new TreeNode(6);
let p = new TreeNode(2);
let q = new TreeNode(8);
let t = new TreeNode(4);
root.left = p;
root.right = q;
p.left = new TreeNode(0);
p.right = t;
q.left = new TreeNode(7);
q.right = new TreeNode(9);
t.left = new TreeNode(3);
t.right = new TreeNode(5);
console.log(lowestCommonAncestor(root, p, t));
