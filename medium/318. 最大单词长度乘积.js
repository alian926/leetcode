/**
 * 
给定一个字符串数组 words，找到 length(word[i]) * length(word[j]) 的最大值，并且这两个单词不含有公共字母。你可以认为每个单词只包含小写字母。如果不存在这样的两个单词，返回 0。

 

示例 1:

输入: ["abcw","baz","foo","bar","xtfn","abcdef"]
输出: 16 
解释: 这两个单词为 "abcw", "xtfn"。
示例 2:

输入: ["a","ab","abc","d","cd","bcd","abcd"]
输出: 4 
解释: 这两个单词为 "ab", "cd"。
示例 3:

输入: ["a","aa","aaa","aaaa"]
输出: 0 
解释: 不存在这样的两个单词。
 

提示：

2 <= words.length <= 1000
1 <= words[i].length <= 1000
words[i] 仅包含小写字母
 */
/**
 * @param {string[]} words
 * @return {number}
 */
// 超时时间限制, 处理两个单词是否有重合部分复杂度高
var maxProduct = function (words) {
	const noRepeat = (l1, l2) => {
		return new Set(l1).size + new Set(l2).size === new Set(l1 + l2).size;
	};
	words.sort((a, b) => b.length - a.length);
	let ret = 0;
	for (let i = 0; i < words.length - 1; i++) {
		for (let j = i + 1; j < words.length; j++) {
			if (noRepeat(words[j], words[i])) {
				ret = Math.max(ret, words[i].length * words[j].length);
			}
		}
	}
	return ret;
};

var maxProduct = function(words) {
  const length = words.length;
  const masks = new Array(length).fill(0);
  for (let i = 0; i < length; i++) {
      const word = words[i];
      const wordLength = word.length;
      /**
       * 通过位运算整合单词
       * 由于字母只有a-z
       * 可以当做'a'~'z'分别位于低0位,低25位
       * 每个单词都可以整合到一个中保存
       *  */ 
      for (let j = 0; j < wordLength; j++) {
        // |= 整合每个字母 1偏移word[j].charCodeAt() - 'a'.charCodeAt()多少
          masks[i] |= 1 << (word[j].charCodeAt() - 'a'.charCodeAt());
      }
  }
  let maxProd = 0;
  for (let i = 0; i < length; i++) {
      for (let j = i + 1; j < length; j++) {
          if ((masks[i] & masks[j]) === 0) {
              maxProd = Math.max(maxProd, words[i].length * words[j].length);
          }
      }
  }
  return maxProd;
};

var maxProduct = function(words) {
  const map = new Map();
  const length = words.length;
  for (let i = 0; i < length; i++) {
      let mask = 0;
      const word = words[i];
      const wordLength = word.length;
      for (let j = 0; j < wordLength; j++) {
          mask |= 1 << (word[j].charCodeAt() - 'a'.charCodeAt());
      }
      // 去除 同型单词 如 aab,baa,aba都是一个内容
      if (wordLength > (map.get(mask) || 0)) {
          map.set(mask, wordLength);
      }
  }
  let maxProd = 0;
  const maskSet = Array.from(map.keys());
  for (const mask1 of maskSet) {
      for (const mask2 of maskSet) {
          if ((mask1 & mask2) === 0) {
              const wordLength1 = map.get(mask1);
              const wordLength2 = map.get(mask2);
              maxProd = Math.max(maxProd, wordLength1 * wordLength2);
          }
      }
  }
  return maxProd;
};


console.log(
	maxProduct([
		'eae',
		'ea',
		'aaf',
		'bda',
		'fcf',
		'dc',
		'ac',
		'ce',
		'cefde',
		'dabae',
	])
);
