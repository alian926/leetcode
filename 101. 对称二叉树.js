/** 
 * 给定一个二叉树，检查它是否是镜像对称的。

 

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

    1
   / \
  2   2
 / \ / \
3  4 4  3
 

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

    1
   / \
  2   2
   \   \
   3    3
 

进阶：

你可以运用递归和迭代两种方法解决这个问题吗？

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
 * @return {boolean}
 */
//递归遍历
var isSymmetric = function(root) {
    //无根节点返回真,边界判断
    if(!root) return true;
    //定义递归函数
    let dfs = function(left, right) {
        //都是空节点对称,返回真
        if(!left && !right) {
            return true
        }
        // 只有一个空节点,另一个不是,不对称,返回假
        if((!left && right) || (left && !right)) {
            return false
        }
        // 两个节点的值不相等,不对称,返回假
        if(left.val !== right.val) {
            return false;
        }
        // 通过观察树的形状可知道, 对称需要判断 左的左和右的右,  左的右和右的左
        return dfs(left.left,right.right) && dfs(left.right, right.left)
    }
    //首次执行判断 根节点的左右节点
    return dfs(root.left, root.right)
};

//队列方式,
var isSymmetric = function(root) {
    //空节点,或者只有根节点的情况返回真
    if(!root || (!root.left && !root.right)) {
        return true;
    }
    let queue = [root.left, root.right];
    //队空时结束循环
    while(queue.length) {
        //出队,获取左右两个节点值
        let left = queue.shift();
        let right = queue.shift();
        //两个节点都是空,继续执行
        if(!left && !right) continue;
        // 只有一个空节点,另一个不是,不对称,返回假
        if((!left && right) || (left && !right)) return false
        // 两个节点的值不相等,不对称,返回假
        if(left.val !== right.val) return false;
        //入队两个需要比较的值
        queue.push(left.left);
        queue.push(right.right);
        //入队另外两个需要比较的值
        queue.push(left.right);
        queue.push(right.left);
    }
    //循环执行完毕,符合条件,为真
    return true;
}