/**
 * 寻找两个正序数组的中位数
 * 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

算法的时间复杂度应该为 O(log (m+n)) 。

 

示例 1：

输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
示例 2：

输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
 

 

提示：

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106

 */


var findMedianSortedArrays = function(nums1, nums2) {
    // 中位数 将一个集合划分为两个长度相等的子集，其中一个子集中的元素总是大于另一个子集中的元素。
    let len1 = nums1.length;
    let len2 = nums2.length;
    //使用二分法查找,以较短的数组为基准
    if(len1 > len2) {
        return findMedianSortedArrays(nums2,nums1);
    }
    // 当一个数组不出现在后一部分时，对应的值为正无穷，就不会对后一部分的最小值产生影响。
    nums1.push(Infinity);
    nums2.push(Infinity);
    let totalMid = (len1 + len2) >> 1;//两个数组合并后的中值为totalMid
    //！！！再看这里
    //left和right表示使用二分法时,数组nums1左闭右开的两个端点
    //我们将两个数组都push进去一个Infinity,这样我们便不用去考虑右边界了
    //同时注意,要将right的初始值设置为n1+1,这样数组1的mid1的范围就包括了[0,n1]
    //mid1为0时,表示 数组1全部被割到了右边,
    //mid1为len1时(这时mid1到了我们增加的Infinity哪里)数组1被全部割到了左边
    //因此在此框架下，我们去使用二分法搜索mid1的所有位置就行了
    let left = 0;
    let right = len1 + 1;
    //[1,2,3][4,5,6]   !!!先看这里
    //我们切的时候只能从 两个数的中间切,mid1表示第一个数组切的那刀的右边的那个下标
    //mid2表示第二个数组切的那刀的右边那个下标
    //根据数量关系可知(自己写俩例子推一下)，mid1和mid2加起来必须等于 (n1+n2)/2
    let mid1 = (left + right) >> 1;
    let mid2 = totalMid - mid1;
    while(true){
        // l1,l2 是nums1,nums2的左区间值,r1,r2是nums1,nums2的右区间值
        // 当一个数组不出现在前一部分时，对应的值为负无穷，就不会对前一部分的最大值产生影响
        let l1 = mid1 === 0 ? -Infinity : nums1[mid1-1];
        let l2 = mid2 === 0 ? -Infinity : nums2[mid2-1];
        let r1 = nums1[mid1];//这里由于我们在最后push了一个Infinity，所以不必考虑右边的边界条件了
        let r2 = nums2[mid2];
        // 前一部分的最大值小于等于后一部分的最小值。
        if(l1<=r2 && l2<=r1){
            if( (len1+len2) % 2 === 0) {
              // 偶数长度情况
                return (Math.max(l1,l2)+Math.min(r1,r2))/2;
            }else {
              // 奇数长度情况
                return Math.min(r1,r2);
            }
        }
        //注意下面二分法的左闭右开 和 对应状态
        //可以通过此框架，完全遍历范围内的所有值
        //以及left,mid,right要处于对应状态
        else if(l1>r2){
            right = mid1;
        }
        else{
            left = mid1;
        }
        mid1 = (left + right) >> 1;
        mid2 = totalMid - mid1;
    }
};

var findMedianSortedArrays = (nums1, nums2) => {
    let len1 = nums1.length, len2 = nums2.length
    if (len1 > len2) return findMedianSortedArrays(nums2, nums1)//对nums1和nums2中长度较小的二分
    // 始终保证len1为较小的值
    let len = len1 + len2//总长
    let start = 0, end = len1 //进行二分的开始和结束位置
    let partLen1, partLen2

    while (start <= end) {
        partLen1 = (start + end) >> 1//nums1二分的位置
        // 需要补1后再二分
        partLen2 = ((len + 1) >> 1) - partLen1//nums2二分的位置

        //L1:nums1二分之后左边的位置，L2，nums1二分之后右边的位置
        //R1:nums2二分之后左边的位置，R2，nums2二分之后右边的位置

        //如果左边没字符了，就定义成-Infinity，让所有数都大于它，否则就是nums1二分的位置左边一个
        let L1 = partLen1 === 0 ? -Infinity : nums1[partLen1 - 1]
        //如果左边没字符了，就定义成-Infinity，让所有数都大于它，否则就是nums2二分的位置左边一个
        let L2 = partLen2 === 0 ? -Infinity : nums2[partLen2 - 1]
        //如果右边没字符了，就定义成Infinity，让所有数都小于它，否则就是nums1二分的位置
        let R1 = partLen1 === len1 ? Infinity : nums1[partLen1]
        //如果右边没字符了，就定义成Infinity，让所有数都小于它，否则就是nums1二分的位置
        let R2 = partLen2 === len2 ? Infinity : nums2[partLen2]

        if (L1 > R2) {//不符合交叉小于等于 继续二分
            // 左边大 end左移动
            end = partLen1 - 1
        } else if (L2 > R1) {//不符合交叉小于等于 继续二分
            // 右边大, start右移动
            start = partLen1 + 1
        } else { // L1 <= R2 && L2 <= R1 符合交叉小于等于
            return len % 2 === 0 ?
                (Math.max(L1, L2) + Math.min(R1, R2)) / 2 : //长度为偶数返回作左侧较大者和右边较小者和的一半
                Math.max(L1, L2)	//长度为奇数返回作左侧较大者
        }
    }
}