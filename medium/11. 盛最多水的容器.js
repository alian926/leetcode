/* 
给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。

*/
/**
 * @param {number[]} height
 * @return {number}
 */
//双重循环穷举,复杂度 O(n ^ 2)
var maxArea = function(height) {
    if(height.length<2) return 0;
    let res = 0;
    for(let i=0,len=height.length; i<len; i++) {
        for(let j=i+1; j<len; j++) {
            res = Math.max((j-i)*Math.min(height[i],height[j]), res)
        }
    }
    return res
};

//双指针法,从两侧向中间移动,每次移动高度较小的
var maxArea = function(height) {
    let left = 0, right = height.length - 1, res = 0;
    while(left < right) {
        res = Math.max( Math.min(height[left], height[right]) * (right - left), res)
        if(height[left] > height[right]) {
            right -= 1;
        }else {
            left += 1;
        }
    }
    return res;
}