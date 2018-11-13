//创建一个菜单
var dishName = ['糖醋排骨', '脆皮鱼', '板栗鸡', '干锅包菜', '广式早茶', '奶油小包', '东北炖菜', '煎饼果子', '日式叉烧', '牛排'];
var dishCost = [40, 60, 120, 16, 10, 2, 60, 5, 55, 120];
var dishPrice = [60, 80, 140, 25, 18, 5, 80, 10, 75, 150];
var menu = [];     

for(var i = 0; i < dishName.length; i++) {
    var dish = new Dishes(dishName[i], dishCost[i], dishPrice[i]);
    menu.push(dish);
}


//定义顾客队列
var cutomersList = [];
//暂定为10个顾客的队列
for(var i = 0; i < 10; i++) {
    var newCustomer = new Customer();
    cutomersList.push(newCustomer);
}
