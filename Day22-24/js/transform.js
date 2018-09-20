//task 1
var scoreObject = {
    "Tony": {
        "Math": 95,
        "English": 79,
        "Music": 68
    }, 
    "Simon": {
        "Math": 100,
        "English": 95,
        "Music": 98
    }, 
    "Annie": {
        "Math": 54,
        "English": 65,
        "Music": 88
    }
}

var scoreArray = new Array();
var personScore = new Array();
for(x in scoreObject) {
    personScore.push(x, scoreObject[x]['Math'], scoreObject[x]['English'], scoreObject[x]['Music']);
    scoreArray.push(personScore);
    personScore = [];
}
console.log(scoreArray);

//task 2
var menuArr = [
    [1, "Area1", -1],
    [2, "Area2", -1],
    [3, "Area1-1", 1],
    [4, "Area1-2", 1],
    [5, "Area2-1", 2],
    [6, "Area2-2", 2],
    [7, "Area1-2-3", 4],
    [8, "Area2-2-1", 6],
];

function transObj(arr, root) {
    var menuObj = {};
    for(var i = 0; i < menuArr.length; i++) {
        if(menuArr[i][2] == root) {
            menuObj[menuArr[i][0]] = {};
            menuObj[menuArr[i][0]].name = menuArr[i][1];
            var tempObj = transObj(arr, menuArr[i][0]);
            if(Object.keys(tempObj).length != 0) {
                menuObj[menuArr[i][0]].subMenu = tempObj;
            }
        }
    }
    return menuObj;
}
console.log(transObj(menuArr, -1));