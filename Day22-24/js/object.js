var tree = {
    "id": 0,
    "name": "root",
    "left": {
        "id": 1,
        "name": "Simon",
        "left": {
            "id": 3,
            "name": "Carl",
            "left": {
                "id": 7,
                "name": "Lee",
                "left": {
                    "id": 11,
                    "name": "Fate"
                }
            },
            "right": {
                "id": 8,
                "name": "Annie",
                "left": {
                    "id": 12,
                    "name": "Saber"
                }
            }
        },
        "right": {
            "id": 4,
            "name": "Tony",
            "left": {
                "id": 9,
                "name": "Candy"
            }
        }
    },
    "right": {
        "id": 2,
        "name": "right",
        "left": {
            "id": 5,
            "name": "Carl",
        },
        "right": {
            "id": 6,
            "name": "Carl",
            "right": {
                "id": 10,
                "name": "Kai"
            }        
        }
    }
}

// 假设id和name均不会重复，根据输入name找到对应的id
function findIdByName(node, name) {
    if(!node) {
        return false;
    }
    if(node.name == name) {
        return node.id;
    } else {
        return findIdByName(node.left, name) || findIdByName(node.right, name);
    }
}

// 假设id和name均不会重复，根据输入id找到对应的name
function findNameById(node, id) {
    if(!node) {
        return false;
    }
    if(node.id == id) {
        return node.name;
    } else {
        return findNameById(node.left, id) || findNameById(node.right, id);
    }
}

// 把这个对象中所有的名字以“前序遍历”的方式全部输出到console中
function getListWithDLR(node) {
    if(!node) {
        return false;
    } else {
        console.log(node.name);
    }
    if(node.left) {
        getListWithDLR(node.left);
    } 
    if(node.right) {
        getListWithDLR(node.right);
    }   
} 

// 把这个对象中所有的名字以“中序遍历”的方式全部输出到console中
function getListWithLDR(node) {
    if(!node) {
        return false;
    }
    if(node.left) {
        getListWithLDR(node.left);
    }
    console.log(node.name);
    if(node.right) {
        getListWithLDR(node.right);
    }
}

// 把这个对象中所有的名字以“后序遍历”的方式全部输出到console中
function getListWithLRD(node) {
    if(!node) {
        return false;
    }
    if(node.left) {
        getListWithLRD(node.left);
    }
    if(node.right) {
        getListWithLRD(node.right);
    }
    console.log(node.name);
}