/**
 * 
 * 
有一幅以二维整数数组表示的图画，每一个整数表示该图画的像素值大小，数值在 0 到 65535 之间。

给你一个坐标 (sr, sc) 表示图像渲染开始的像素值（行 ，列）和一个新的颜色值 newColor，让你重新上色这幅图像。

为了完成上色工作，从初始坐标开始，记录初始坐标的上下左右四个方向上像素值与初始坐标相同的相连像素点，接着再记录这四个方向上符合条件的像素点与他们对应四个方向上像素值与初始坐标相同的相连像素点，……，重复该过程。将所有有记录的像素点的颜色值改为新的颜色值。

最后返回经过上色渲染后的图像。

示例 1:

输入: 
image = [[1,1,1],[1,1,0],[1,0,1]]
sr = 1, sc = 1, newColor = 2
输出: [[2,2,2],[2,2,0],[2,0,1]]
解析: 
在图像的正中间，(坐标(sr,sc)=(1,1)),
在路径上所有符合条件的像素点的颜色都被更改成2。
注意，右下角的像素没有更改为2，
因为它不是在上下左右四个方向上与初始点相连的像素点。
注意:

image 和 image[0] 的长度在范围 [1, 50] 内。
给出的初始点将满足 0 <= sr < image.length 和 0 <= sc < image[0].length。
image[i][j] 和 newColor 表示的颜色值在范围 [0, 65535]内。
 */

/**
 *
 * 1 1 1
 * 1 1 0
 * 1 0 1
 */

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, newColor) {
  let queue = [[sr, sc]];
  let need = new Set(queue);
  let had = new Set();
  var isEqual = function (image, sr, sc, val) {
    if (had.has(`${sr},${sc}`)) {
      return false;
    }
    had.add(`${sr},${sc}`);
    if (sr >= 0 && sc >= 0 && sr < image.length && sc < image[sr].length) {
      return image[sr][sc] === val;
    }
    return false;
  };

  while (queue.length) {
    let s = queue.shift();
    let sr = s[0],
      sc = s[1];
    let v = image[sr][sc];
    if (isEqual(image, sr - 1, sc, v)) {
      queue.push([sr - 1, sc]);
      need.add([sr - 1, sc]);
    }
    if (isEqual(image, sr, sc - 1, v)) {
      queue.push([sr, sc - 1]);
      need.add([sr, sc - 1]);
    }
    if (isEqual(image, sr + 1, sc, v)) {
      queue.push([sr + 1, sc]);
      need.add([sr + 1, sc]);
    }
    if (isEqual(image, sr, sc + 1, v)) {
      queue.push([sr, sc + 1]);
      need.add([sr, sc + 1]);
    }
  }
  for (let s of need) {
    image[s[0]][s[1]] = newColor;
  }
  return image;
};

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, newColor) {
  let queue = [[sr, sc]];
  let need = new Set(queue);
  let had = new Set();
  // 判断是否需要记录
  var isEqual = function (image, sr, sc, val) {
    // 去除重复节点
    if (had.has(`${sr},${sc}`)) {
      return false;
    }
    had.add(`${sr},${sc}`);
    // 范围内比较
    if (sr >= 0 && sc >= 0 && sr < image.length && sc < image[sr].length) {
      return image[sr][sc] === val;
    }
    return false;
  };

  // 其余四个方向的变换矩阵
  const ds = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (queue.length) {
    let s = queue.shift();
    let centerVal = image[s[0]][s[1]];
    for (let d of ds) {
      let otherSr = s[0] + d[0],
        otherSc = s[1] + d[1];
      if (isEqual(image, otherSr, otherSc, centerVal)) {
        queue.push([otherSr, otherSc]);
        need.add([otherSr, otherSc]);
      }
    }
  }
  for (let s of need) {
    image[s[0]][s[1]] = newColor;
  }
  return image;
};
