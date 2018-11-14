// 餐厅类
function Restaurant(cash, seats) {
    this.cash = cash;
    this.seats = seats;
    this.employees = [];
}

Restaurant.prototype.hire = function(employee) {
    this.employees.push(employee);
}

Restaurant.prototype.fire = function(employee) {
    var staffId = employee.staffId;
    for(var i = 0; i < this.employees.length; i++) {
        if(this.employees[i].staffId == staffId) {
            this.employees = this.employees.slice(0, i).concat(this.employees.slice(i + 1));
        }
    }
}

//  职员类
function Staff(id, name, salary) {
    this.staffId = id;
    this.name = name;
    this.salary = salary;
}

//  服务员
function Waiter(id, name, salary) {
    Staff.call(this, id, name, salary);
    
}

Waiter.prototype.service = function(arg, customer) {
    if(arg instanceof Array) {
        console.log('服务员点菜！');
        return customer.order(arg);
    } else {
        console.log('服务员上菜');
        customer.eat(arg);
    }
}

var singletonWaiter = (function() {
    var instance = null;
    return function(id, name, salary) {
        if(!instance) {
            instance = new Waiter(id, name, salary);
        }
        return instance;
    }
})()

// 厨师类
function Chef(id, name, salary) {
    Staff.call(this, id, name, salary);
}

Chef.prototype.cook = function(Dish, Waiter) {
    console.log('厨师烹饪食物');
    Waiter.service(Dish, currentCustomer);
}

var singletonChef = (function() {
    var instance = null;
    return function(id, name, salary) {
        if(!instance) {
            instance = new Chef(id, name, salary);
        }
        return instance;
    }
})()

// 顾客类
function Customer() {}

Customer.prototype.order = function(menu) {
    var orderNum = Math.floor(Math.random() * menu.length);
    console.log('吃' + menu[orderNum].name + '~');
    return menu[orderNum];
}

Customer.prototype.eat = function(Dishes) {
    // for(var i = 0; i < this.dishes.length; i++) {
    //     if(this.dishes[i].name == Dishes.name) {
    //         this.dishes = this.dishes.slice(0, i).concat(this.dishes.slice(i + 1));
    //     }
    // }
    // restaurant.cash += Dishes.price;
    console.log('顾客吃菜');
}

// 菜品类
function Dishes(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
}