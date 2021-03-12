/** 
 * 给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。

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
 * @return {number}
 */
//通过, 递归
var maxDepth = function(root) {
    //边界判断
    if(!root) return 0;
    //最大深度记录
    let max = 1;
    //递归函数, 参数左右节点和当前已到达深度
    var dfs = function(left,right,d) {
        if(!left && !right) {
            return max = Math.max(max, d);
        }
        if(left) {
            dfs(left.left, left.right, d+1)
        }
        if(right) {
            dfs(right.left, right.right, d+1)
        }
    }
    dfs(root.left,root.right,1);
    return max;
};

//递归简单写法,但是效率低于上面的
var maxDepth = function(root) {
    if(!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right))+1
}

//广度优先搜索
var maxDepth = function(root) {
    if(!root) return 0;
    //创建初始队列
    let queue = [root];
    //初始深度0
    let depth = 0;
    //注意while 循环条件, true执行, 第一次写错了
    //如果没有值了,则退出循环
    while(queue.length) {
        //每次执行的时候深度加1
        depth += 1;
        let { length } = queue;
        //将当前深度的节点全部取出,并写入下一层的值
        for(let i=0; i<length; i++) {
            let item = queue.shift();
            if(item.left) {
                queue.push(item.left)
            }
            if(item.right) {
                queue.push(item.right)
            }
        }
    }
    return depth
}