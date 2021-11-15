/**
 * 
实现一个 MapSum 类，支持两个方法，insert 和 sum：

MapSum() 初始化 MapSum 对象
void insert(String key, int val) 插入 key-val 键值对，字符串表示键 key ，整数表示值 val 。如果键 key 已经存在，那么原来的键值对将被替代成新的键值对。
int sum(string prefix) 返回所有以该前缀 prefix 开头的键 key 的值的总和。
 

示例：

输入：
["MapSum", "insert", "sum", "insert", "sum"]
[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
输出：
[null, null, 3, null, 5]

解释：
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);  
mapSum.sum("ap");           // return 3 (apple = 3)
mapSum.insert("app", 2);    
mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)
 

提示：

1 <= key.length, prefix.length <= 50
key 和 prefix 仅由小写英文字母组成
1 <= val <= 1000
最多调用 50 次 insert 和 sum
 */

var MapSum = function () {
	this.store = {};
};

/**
 * @param {string} key
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function (key, val) {
	this.store[key] = val;
};

/**
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function (prefix) {
	let keys = Object.keys(this.store);
	let targetKeys = keys.filter((key) => key.startsWith(prefix));
	return targetKeys.reduce((res, key) => {
		res += this.store[key];
		return res;
	}, 0);
};
/**
 * 
// map结构存储
var MapSum = function() {
    this.map = new Map();

};

MapSum.prototype.insert = function(key, val) {
    this.map.set(key, val);
};

MapSum.prototype.sum = function(prefix) {
    let res = 0;
    for (const s of this.map.keys()) {
        if (s.startsWith(prefix)) {
            res += this.map.get(s);
        }
    }
    return res;
};
 */

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */

/**
 * 
// 前缀哈希表
var MapSum = function() {
    this.map = new Map();
    this.prefixmap = new Map();

};

MapSum.prototype.insert = function(key, val) {
    const delta = val - (this.map.get(key) || 0);
    this.map.set(key, val);
    for (let i = 1; i <= key.length; ++i) {
        const currprefix = key.substring(0, i);
        this.prefixmap.set(currprefix, (this.prefixmap.get(currprefix) || 0) + delta);
    }
};

MapSum.prototype.sum = function(prefix) {
    return this.prefixmap.get(prefix) || 0;
};
 */
