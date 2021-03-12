/** 
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
示例:

输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
说明:
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

*/
/**
 * @param {string} digits
 * @return {string[]}
 */
//回溯的方式
var letterCombinations = function(digits) {
    //构建索引表
    let map = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }
    //结果组
    let res = [];
    function backtrack(nextDigits, combination='') {
        //字符内容为空,在有组合结果的情况下,存入结果, 除去边界值
        if(!nextDigits.length) {
            return combination && res.push(combination)
        }
        //每次提取一组字符
        let str = map[nextDigits[0]];
        //遍历该组字符,重复执行
        for(let j=0, sLen=str.length; j<sLen; j++) {
            backtrack(nextDigits.slice(1), combination+str[j])
        }
    }
    backtrack(digits)
    return res;
};

//队列的方式
var letterCombinations = function(digits) {
    //构建索引表
    let map = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }
    //空字符边界返回
    if(!digits) {
        return []
    }
    //初始化含有一个空字符,便于内部遍历
    let result = [''];
    //循环原始字符串
    for(let i=0,len=digits.length; i<len; i++) {
        //获取数字对应的字符组
        let tmp = map[digits[i]].split('');
        //创建临时结果队列
        let tmpRes = [];
        //遍历字符组
        for(let j=0, jLen=tmp.length; j<jLen; j++) {
            //遍历当前结果内容
            for(let k=0, kLen=result.length; k<kLen; k++) {
                tmpRes.push(result[k]+tmp[j])
            }
        }
        result = tmpRes;
    }
    return result
}
console.log(letterCombinations('23'))