 /*
实现一个字符串头尾去除空格的函数
注意需要去除的空格，包括全角、半角空格
暂时不需要学习和使用正则表达式的方式
*/
function diyTrim(str) {
while(str.charCodeAt(0) === 32 || str.charCodeAt(0) === 12288) {
    str = str.slice(1);
}
while(str.charCodeAt(str.length - 1) === 32 || str.charCodeAt(str.length - 1) === 12288) {
    str = str.slice(0, str.length - 1);
}
return str;
}

// 测试用例
console.log(diyTrim(' a f b    ')); // ->a f b
console.log(diyTrim('    ffdaf    ')); // ->ffdaf
console.log(diyTrim('1    ')); // ->1
console.log(diyTrim('　　f')); // ->f
console.log(diyTrim('  　  a f b 　　 ')); // ->a f b
console.log(diyTrim(' ')); // ->
console.log(diyTrim('　')); // ->
console.log(diyTrim('')); // ->

/*
去掉字符串str中，连续重复的地方
*/
function removeRepetition(str) {
var result = "";
var textArray = new Array();
textArray.push(str[0])
for(var i = 1; i < str.length; i++) {
    if(str[i] === str[i - 1]) {
        continue;
    }
    textArray.push(str[i]);
}
result = textArray.join('');
return result;
}

// 测试用例
console.log(removeRepetition("aaa")); // ->a
console.log(removeRepetition("abbba")); // ->aba
console.log(removeRepetition("aabbaabb")); // ->abab
console.log(removeRepetition("")); // ->
console.log(removeRepetition("abc")); // ->abc