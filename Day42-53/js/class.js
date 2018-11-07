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

Waiter.prototype.service = function(Customer, Dishes, Chef) {
    if(typeof Dishes == Array) {
        for(var i = 0; i < Dishes.length; i++) {
            Customer.order(Dishes[i]);
            Chef.cook(Dishes, this);
        }
    } else {
        Customer.eat(Dishes);
    }
}

// 厨师类
function Chef(id, name, salary) {
    Staff.call(this, id, name, salary);
}

Chef.prototype.cook = function(Dishes, Waiter) {
    var dishesArray = [];
    dishesArray.push(Dishes);
    Waiter.service(dishesArray);
}

// 顾客类
function Customer() {
    this.dishes = [];
}

Customer.prototype.order = function(Dishes) {
    this.dishes.push(Dishes);
}

Customer.prototype.eat = function(Dishes) {
    for(var i = 0; i < this.dishes.length; i++) {
        if(this.dishes[i].name == Dishes.name) {
            this.dishes = this.dishes.slice(0, i).concat(this.dishes.slice(i + 1));
        }
    }
}

// 菜品类
function Dishes(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
}