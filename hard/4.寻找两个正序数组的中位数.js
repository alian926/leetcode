var findMedianSortedArrays = function(nums1, nums2) {
    // let quickSort = function(list) {
    //     if(list.length < 2) {
    //         return list
    //     }
    //     let midIdx = list.length >> 1;
    //     let mid = list.splice(midIdx,1)[0];
    //     let left=[],right=[];
    //     for(let i=0;i<list.length;i++) {
    //         if(list[i] < mid) {
    //             left.push(list[i])
    //         }else {
    //             right.push(list[i])
    //         }
    //     }
    //     return quickSort(left).concat(mid,quickSort(right))
    // }
    // let targetNums = quickSort(nums1.concat(nums2));
    // let length = targetNums.length;
    // if(length % 2 === 0) {
    //     return (targetNums[length/2]+targetNums[length/2 - 1])/2
    // }else {
    //     return targetNums[length >> 1]
    // }

    // let mySort = function(nums1,nums2) {
    //     let result = []
    //     while(nums1.length && nums2.length) {
    //         if(nums1[0] <= nums2[0]) {
    //             result.push(nums1.shift())
    //         }else {
    //             result.push(nums2.shift())
    //         }
    //     }
    //     if(nums1.length) {
    //         return result.concat(nums1)
    //     }
    //     if(nums2.length) {
    //         return result.concat(nums2)
    //     }
    // }
    // let targetNums = mySort(nums1,nums2);
    // let length = targetNums.length;
    // if(length % 2 === 0) {
    //     return (targetNums[length/2]+targetNums[length/2 - 1])/2
    // }else {
    //     return targetNums[length >> 1]
    // }

    //获取非空数组的中位数
    // let getMedium = function(nums) {
    //     let { length } = nums;
    //     if(length == 1) {
    //         return nums[0];
    //     }
    //     if(length % 2 === 0) {
    //         return (nums[length/2] + nums[length/2 - 1]) / 2;
    //     }else {
    //         return nums[length<<1];
    //     }
    // }
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