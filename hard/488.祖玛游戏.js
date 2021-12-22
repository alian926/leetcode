/**
 * 
你正在参与祖玛游戏的一个变种。

在这个祖玛游戏变体中，桌面上有 一排 彩球，每个球的颜色可能是：红色 'R'、黄色 'Y'、蓝色 'B'、绿色 'G' 或白色 'W' 。你的手中也有一些彩球。

你的目标是 清空 桌面上所有的球。每一回合：

从你手上的彩球中选出 任意一颗 ，然后将其插入桌面上那一排球中：两球之间或这一排球的任一端。
接着，如果有出现 三个或者三个以上 且 颜色相同 的球相连的话，就把它们移除掉。
如果这种移除操作同样导致出现三个或者三个以上且颜色相同的球相连，则可以继续移除这些球，直到不再满足移除条件。
如果桌面上所有球都被移除，则认为你赢得本场游戏。
重复这个过程，直到你赢了游戏或者手中没有更多的球。
给你一个字符串 board ，表示桌面上最开始的那排球。另给你一个字符串 hand ，表示手里的彩球。请你按上述操作步骤移除掉桌上所有球，计算并返回所需的 最少 球数。如果不能移除桌上所有的球，返回 -1 。

 

示例 1：

输入：board = "WRRBBW", hand = "RB"
输出：-1
解释：无法移除桌面上的所有球。可以得到的最好局面是：
- 插入一个 'R' ，使桌面变为 WRRRBBW 。WRRRBBW -> WBBW
- 插入一个 'B' ，使桌面变为 WBBBW 。WBBBW -> WW
桌面上还剩着球，没有其他球可以插入。
示例 2：

输入：board = "WWRRBBWW", hand = "WRBRW"
输出：2
解释：要想清空桌面上的球，可以按下述步骤：
- 插入一个 'R' ，使桌面变为 WWRRRBBWW 。WWRRRBBWW -> WWBBWW
- 插入一个 'B' ，使桌面变为 WWBBBWW 。WWBBBWW -> WWWW -> empty
只需从手中出 2 个球就可以清空桌面。
示例 3：

输入：board = "G", hand = "GGGGG"
输出：2
解释：要想清空桌面上的球，可以按下述步骤：
- 插入一个 'G' ，使桌面变为 GG 。
- 插入一个 'G' ，使桌面变为 GGG 。GGG -> empty
只需从手中出 2 个球就可以清空桌面。
示例 4：

输入：board = "RBYYBBRRB", hand = "YRBGB"
输出：3
解释：要想清空桌面上的球，可以按下述步骤：
- 插入一个 'Y' ，使桌面变为 RBYYYBBRRB 。RBYYYBBRRB -> RBBBRRB -> RRRB -> B
- 插入一个 'B' ，使桌面变为 BB 。
- 插入一个 'B' ，使桌面变为 BBB 。BBB -> empty
只需从手中出 3 个球就可以清空桌面。
 

提示：

1 <= board.length <= 16
1 <= hand.length <= 5
board 和 hand 由字符 'R'、'Y'、'B'、'G' 和 'W' 组成
桌面上一开始的球中，不会有三个及三个以上颜色相同且连着的球
 */
/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
var findMinStep = function (board, hand) {
	const visited = new Set();
	let result = Number.MAX_SAFE_INTEGER;
  // 合并同色球函数,遇连续3球（快指针 > 慢指针2球），即删除
  const combine = board => {
    for (let slow = 0, fast = 0; fast <= board.length; fast++) {
      if (board[slow] === board[fast]) continue
      if (fast - slow > 2) {
        // 此刻fast已经是另一个颜色, [slow,fast) 是需要去除的同色球
        board = board.substring(0, slow) + board.substring(fast)
        //消除后需要从头开始 重新计算是否需要消除
        fast = 0
      }
      // 颜色不同重新定位快慢指针
      slow = fast
    }
    // 返回消除同色后的桌面球
    return board
  }
	const dfs = (board, hand, count) => {
    // 没有位置
		if (board.length === 0) return (result = Math.min(result, count));
    // 手上没有球 || 已经访问过
		if (hand.length === 0 || visited.has(board + count)) return;
    // 记录
		visited.add(board + count);
    // 双循环从board拿位置，从hand拿球，每拿一次，计数器+1
		for (let i = 0; i < board.length; i++)
			for (let j = 0; j < hand.length; j++)
				dfs(
					combine(board.substring(0, i) + hand[j] + board.substring(i)),
					hand.substring(0, j) + hand.substring(j + 1),
					count + 1
				);
	};
	dfs(board, hand, 0);
	return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
