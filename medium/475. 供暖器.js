/**
 * 
冬季已经来临。 你的任务是设计一个有固定加热半径的供暖器向所有房屋供暖。

在加热器的加热半径范围内的每个房屋都可以获得供暖。

现在，给出位于一条水平线上的房屋 houses 和供暖器 heaters 的位置，请你找出并返回可以覆盖所有房屋的最小加热半径。

说明：所有供暖器都遵循你的半径标准，加热的半径也一样。

 

示例 1:

输入: houses = [1,2,3], heaters = [2]
输出: 1
解释: 仅在位置2上有一个供暖器。如果我们将加热半径设为1，那么所有房屋就都能得到供暖。
示例 2:

输入: houses = [1,2,3,4], heaters = [1,4]
输出: 1
解释: 在位置1, 4上有两个供暖器。我们需要将加热半径设为1，这样所有房屋就都能得到供暖。
示例 3：

输入：houses = [1,5], heaters = [2]
输出：3
 

提示：

1 <= houses.length, heaters.length <= 3 * 104
1 <= houses[i], heaters[i] <= 109
 */

/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
// 排序+二分查找
var findRadius = function (houses, heaters) {
    let ans = 0;
    // 给出的 houses 是有序的, heaters是无序的, 如果利用二分需要手动排序
    heaters = heaters.sort((a, b) => a - b);
    const search = (value, arr = heaters) => {
        let l = 0,
            r = heaters.length - 1;
        while (l < r) {
            const m = l + Math.floor((r - l + 1) / 2);
            if (arr[m] <= value) {
                l = m;
            } else {
                r = m - 1;
            }
        }
        return l;
    };
    houses.forEach(house => {
        const index = search(house);
        let target = Math.min(
            Math.abs(heaters[index] - house),
            heaters[index + 1] ? Math.abs(heaters[index + 1] - house) : Infinity
        );
        ans = Math.max(ans, target);
    });
    return ans;
};

// console.log(findRadius([1, 5], [2]));
console.log(
    findRadius(
        [
            282475249, 622650073, 984943658, 144108930, 470211272, 101027544,
            457850878, 458777923,
        ],
        [
            823564440, 115438165, 784484492, 74243042, 114807987, 137522503,
            441282327, 16531729, 823378840, 143542612,
        ]
    )
); // 161834419 // 错误输出: 841401046

// 官方题解, 双指针方法
var findRadius = function (houses, heaters) {
    // 通过排序后, 房子位置和暖气所在位置是大小有序的, 下标有依赖
    houses.sort((a, b) => a - b);
    heaters.sort((a, b) => a - b);
    let ans = 0;
    for (let i = 0, j = 0; i < houses.length; i++) {
        let curDistance = Math.abs(houses[i] - heaters[j]);
        // 当前房屋距离 j暖气的位置小于下一个点 j+1, 需要j右移
        while (
            j < heaters.length - 1 &&
            Math.abs(houses[i] - heaters[j]) >=
                Math.abs(houses[i] - heaters[j + 1])
        ) {
            j++;
            // 找到房屋距离最近暖气的距离
            curDistance = Math.min(
                curDistance,
                Math.abs(houses[i] - heaters[j])
            );
        }
        // 记录每个房屋所需要的最大半径
        ans = Math.max(ans, curDistance);
    }
    return ans;
};
