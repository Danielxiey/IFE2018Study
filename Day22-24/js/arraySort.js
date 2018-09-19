//task 1
var arr1 = [43, 54, 4, -4, 84, 100, 58, 27, 140];

arr1.sort(function(a, b) {
    return a - b;
});
console.log(arr1);

arr1.sort(function(a, b) {
    return b - a;
})
console.log(arr1);

//task 2
var arr2 = ['apple', 'dog', 'cat', 'car', 'zoo', 'orange', 'airplane'];

arr2.sort();
console.log(arr2);

arr2.sort(function(a, b) {
    if(a < b) {
        return 1;
    }
    if(a > b) {
        return -1;
    }
    return 0;
})
console.log(arr2);

//task 3
var arr3 = [[10, 14], [16, 60], [7, 44], [26, 35], [22, 63]];

arr3.sort(function(a, b) {
    return b[1] - a[1];
})
console.log(arr3);

//task 4
var arr4 = [
    {
        id: 1,
        name: 'candy',
        value: 40
    }, {
        id: 2,
        name: 'Simon',
        value: 50
    }, {
        id: 3,
        name: 'Tony',
        value: 45
    }, {
        id: 4,
        name: 'Annie',
        value: 60
    }
];

arr4.sort(function(a, b) {
    return a.value - b.value;
})        
console.log(arr4);