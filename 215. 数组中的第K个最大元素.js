/** 
 * 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:

输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
示例 2:

输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
说明:

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。
 * 
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 最不经过思考的方法
var findKthLargest = function (nums, k) {
    nums.sort((a, b) => a - b);
    return nums[nums.length - k]
};
// 基于手写的快速排序
var findKthLargest = function (nums, k) {
    function quickSort(nums) {
        if (nums.length < 2) {
            return nums;
        }
        const midIndex = nums.length >> 1;
        const mid = nums.splice(midIndex, 1)[0];
        const left = [];
        const right = []
        // 注意 length 在nums.splice处发生了改变, 不能在循环处使用对象解构出来的length
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] <= mid) {
                left.push(nums[i])
            } else {
                right.push(nums[i])
            }
        }
        return [...quickSort(left), mid, ...quickSort(right)]
    }
    nums = quickSort(nums);
    return nums[nums.length - k];
}

// 基于堆排序  有问题
// 最小堆
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUAL: 0,
}

function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUAL
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

function swap(arr, a, b) {
    const tmp = arr[a]
    arr[a] = arr[b]
    arr[b] = tmp
}

class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        // 使用数组的存储结构,  如果下面位置可用则:
        // 左侧子节点位置 2*index+1
        // 右侧子节点 2*index+2
        // 父节点位置 (index-1) / 2
        this.heap = []
    }
    getLeftIndex(index) {
        return 2 * index + 1
    }
    getRightIndex(index) {
        return 2 * index + 2
    }
    getParentIndex(index) {
        if (index == 0) {
            return
        }
        return Math.floor((index - 1) / 2)
    }
    insert(value) {
        if (value != null) {
            this.heap.push(value)
            this.siftUp(this.heap.length - 1)
            return true
        }
        return false
    }
    // 上移
    siftUp(index) {
        let parent = this.getParentIndex(index)
        while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN) {
            swap(this.heap, parent, index)
            index = parent
            parent = this.getParentIndex(index)
        }
    }
    // 移除最小值
    extract() {
        if (this.isEmpty()) {
            return
        }
        if (this.size() === 1) {
            return this.heap.shift()
        }
        swap(this.heap,0, this.size()-1)
        const removedValue = this.heap.pop()
        this.siftDown(0)
        return removedValue
    }
    // 下移
    siftDown(index) {
        let element = index
        const left = this.getLeftIndex(index)
        const right = this.getRightIndex(index)
        const size = this.size()
        if (left < size && this.compareFn(this.heap[element], this.heap[left]) == Compare.BIGGER_THAN) {
            element = left
        }else if (right < size && this.compareFn(this.heap[element], this.heap[right]) == Compare.BIGGER_THAN) {
            element = right
        }
        if (element !== index) {
            swap(this.heap, index, element)
            this.siftDown(element)
        }
    }
    // 返回最小堆的最小值
    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0]
    }
    size() {
        return this.heap.length
    }
    isEmpty() {
        return this.size() === 0
    }

}

// 最大堆
function reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a)
}


class MaxHeap extends MinHeap {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = reverseCompare(compareFn)
    }
}

// 基于最大堆
var findKthLargest = function (nums, k) {
    let heap = new MaxHeap();
    for (let i = 0, len = nums.length; i < len; i++) {
        heap.insert(nums[i])
    }
    for (let i = 0; i < k - 1; i++) {
        heap.extract()
    }
    return heap.findMinimum()
}
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6, 7, 7, 8, 2, 3, 1, 1, 1, 10, 11, 5, 6, 2, 4, 7, 8, 5, 6], 20))

