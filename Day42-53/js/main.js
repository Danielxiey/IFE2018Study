//创建餐厅的初始状态
var restaurant = new Restaurant(1000, 1);

//雇佣了一个厨师
var newCook = new Chef(1, "Tony", 3000);
restaurant.hire(newCook);

//雇佣了一个服务员
var newWaiter = new Waiter(2, 'XiaoNan', 1000);
restaurant.hire(newWaiter);

while(cutomersList.length > 0) {
    if(restaurant.seats > 0) {
        //客人入座
        console.log('有请下一位顾客!');
        var currentCustomer = cutomersList.shift();
        restaurant.seats--;
        //服务员点菜
        var dish = newWaiter.service(menu, currentCustomer);
        //厨师做菜,服务员上菜
        newCook.cook(dish, newWaiter);
        restaurant.seats++;
    }
}