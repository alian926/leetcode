/**
 * 
给你一个数组 rectangles ，其中 rectangles[i] = [xi, yi, ai, bi] 表示一个坐标轴平行的矩形。这个矩形的左下顶点是 (xi, yi) ，右上顶点是 (ai, bi) 。

如果所有矩形一起精确覆盖了某个矩形区域，则返回 true ；否则，返回 false 。

 
示例 1：


输入：rectangles = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]
输出：true
解释：5 个矩形一起可以精确地覆盖一个矩形区域。 
示例 2：


输入：rectangles = [[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]]
输出：false
解释：两个矩形之间有间隔，无法覆盖成一个矩形。
示例 3：


输入：rectangles = [[1,1,3,3],[3,1,4,2],[1,3,2,4],[3,2,4,4]]
输出：false
解释：图形顶端留有空缺，无法覆盖成一个矩形。
示例 4：


输入：rectangles = [[1,1,3,3],[3,1,4,2],[1,3,2,4],[2,2,4,4]]
输出：false
解释：因为中间有相交区域，虽然形成了矩形，但不是精确覆盖。
 

提示：

1 <= rectangles.length <= 2 * 104
rectangles[i].length == 4
-105 <= xi, yi, ai, bi <= 105

 */

/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
// 不能只考虑面积的大小是否相同,如果缺失的部分和重叠的部分相同那么面积比较也是相同的
// 参考 宫水三叶的题解: https://leetcode-cn.com/problems/perfect-rectangle/solution/gong-shui-san-xie-chang-gui-sao-miao-xia-p4q4/
var isRectangleCover = function (rectangles) {
	let n = rectangles.length;
	// let rs = new Array(n * 2).fill(0).map(() => new Array(4).fill(0));
	let rs = [];
	for (let i = 0, idx = 0; i < n; i++) {
		const re = rectangles[i];
		// 将每个矩形看做两条竖直方向的线, 使用 (x, y1, y2, tag) 方式存储
		// 下标 0左x坐标, 1 3y坐标, 2右x坐标
		rs[idx++] = [re[0], re[1], re[3], 1];
		rs[idx++] = [re[2], re[1], re[3], -1];
	}
	// 排序 优先比较x坐标,同x比较y坐标
	rs.sort((a, b) => {
		if (a[0] != b[0]) return a[0] - b[0];
		return a[1] - b[1];
	});
	n *= 2;
	// 分别存储相同的x坐标下「左边的线段」和「右边的线段」 (y1, y2)
	let l1 = [],
		l2 = [];
	for (let l = 0; l < n; ) {
		let r = l;
		l1 = [];
		l2 = [];
		// 找到x坐标相同部分
		while (r < n && rs[r][0] == rs[l][0]) r++;
		// 此处r多一个, i<r 没有等于
		for (let i = l; i < r; i++) {
			// [y1, y2]
			let cur = [rs[i][1], rs[i][2]];
			let list = rs[i][3] == 1 ? l1 : l2;
			if (list.length === 0) {
				list.push(cur);
			} else {
				let prev = list[list.length - 1];
				// 存在重叠
				if (cur[0] < prev[1]) return false;
				// 首尾相连
				else if (cur[0] == prev[1]) prev[1] = cur[1];
				// 不能连接上，记录新的一段, 可能是两块中间被插入一条很长的
				// 如数据 [1,2,4,4],[1,0,4,1],[0,2,1,3],[0,1,3,2],[3,1,4,2],[0,3,1,4],[0,0,1,1]]
				else list.push(cur);
			}
		}
		// 若不是完美矩形的边缘竖边，检查是否成对出现
		if (l > 0 && r < n) {
			if (l1.length != l2.length) return false;
			for (let i = 0; i < l1.length; i++) {
				if (l1[i][0] == l2[i][0] && l1[i][1] == l2[i][1]) continue;
				return false;
			}
		} else {
			// 若是完美矩形的边缘竖边，检查是否 只形成完整一段
			if (l1.length + l2.length != 1) return false;
		}
		// 下一轮扫描
		l = r;
	}
	return true;
};

// 官方题解
var isRectangleCover = function (rectangles) {
	let area = 0;
	let minX = rectangles[0][0],
		minY = rectangles[0][1],
		maxX = rectangles[0][2],
		maxY = rectangles[0][3];
	const cnt = new Map();
	for (const rect of rectangles) {
		const x = rect[0],
			y = rect[1],
			a = rect[2],
			b = rect[3];
		area += (a - x) * (b - y);

		minX = Math.min(minX, x);
		minY = Math.min(minY, y);
		maxX = Math.max(maxX, a);
		maxY = Math.max(maxY, b);

		cnt.set([x, y].toString(), (cnt.get([x, y].toString()) || 0) + 1);
		cnt.set([x, b].toString(), (cnt.get([x, b].toString()) || 0) + 1);
		cnt.set([a, y].toString(), (cnt.get([a, y].toString()) || 0) + 1);
		cnt.set([a, b].toString(), (cnt.get([a, b].toString()) || 0) + 1);
	}

	const pointMinMin = [minX, minY].toString();
	const pointMinMax = [minX, maxY].toString();
	const pointMaxMin = [maxX, minY].toString();
	const pointMaxMax = [maxX, maxY].toString();
	if (
		area !== (maxX - minX) * (maxY - minY) ||
		(cnt.get(pointMinMin) || 0) !== 1 ||
		(cnt.get(pointMinMax) || 0) !== 1 ||
		(cnt.get(pointMaxMin) || 0) !== 1 ||
		(cnt.get(pointMaxMax) || 0) !== 1
	) {
		console.log(cnt.get([minX, minY].toString()));
		return false;
	}

	cnt.delete(pointMinMin);
	cnt.delete(pointMinMax);
	cnt.delete(pointMaxMin);
	cnt.delete(pointMaxMax);

	for (const [_, value] of cnt.entries()) {
		if (value !== 2 && value !== 4) {
			return false;
		}
	}

	return true;
};
