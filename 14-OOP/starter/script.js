'use strict';

/* *******************
// WHAT HAPPENS BEHIND THE CODE:
// 1. NEW {} IS CREATED.
// 2. FUNCTION IS CALLED, NOW this = {}
// 3. {} LINKED TO PROTOTYPE
// 4. FUNCTION AUTOMATICALLY RETURN {}
************************* */

// ************** CONSTRUCTOR FUNCTION **************
// const Person = function (firstName, birthDate) {
//   // INSTANCE PROPERTIES
//   this.firstName = firstName;
//   this.birthDate = birthDate;
// };

// // INSTANCE OF OBJECT
// const thomaz = new Person('Thomaz', 1994);
// console.log(thomaz);

// const matheus = new Person('Matheus', 1997);
// console.log(matheus);

// // CHECK IF ITS A INSTANCE
// const hilca = 'Hilca';
// console.log(thomaz instanceof Person); // TRUE
// console.log(hilca instanceof Person); // FALSE

// // DECLARING STATIC METHODS ON FUNCTION EXPRESSION
// Person.hey = function () {
//   console.log('Hey there 👋');
// };
// Person.hey();

// // ************** PROTOTYPES **************
// Person.prototype.calcAge = function () {
//   console.log(`Age: ${2022 - this.birthDate}`);
// };
// thomaz.calcAge();
// matheus.calcAge();

// console.log(thomaz.__proto__); // Person.prototype
// console.log(Person.prototype.isPrototypeOf(thomaz)); // TRUE
// console.log(Person.prototype.isPrototypeOf(Person)); // FALSE, IS PROTOTYPE OF EVERY Person INSTANCE, NOT Person ITSELF

// Person.prototype.species = 'Homo Sapiens';
// console.log(thomaz.species, matheus.species);
// console.log(thomaz.hasOwnProperty('firstName')); // TRUE
// console.log(thomaz.hasOwnProperty('species')); // FALSE, ITS Person PROPERTY

// // PROTOTYPES IN BUILD-IN OBJECTS - LIKE ARRAYS
// const arr = [6, 4, 6, 3, 3, 4, 6];
// console.log(arr.__proto__); // SHOWS Array.prototype
// console.log(arr.__proto__ === Array.prototype); // TRUE
// console.log(arr.__proto__.__proto__); // SHOWS Object.prototype

// // DON'T CREATE METHODS IN BUILD-IN OBJECTS - IT'S A BAD PRACTICE
// Array.prototype.unique = function () {
//   return [...new Set(this)]; // RETURN UNIQUE VALUES OF ARRAY
// };
// console.log(arr.unique());

// // ************** CHALLENGE #1 **************
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// const bmw = new Car('BMW', 110);
// const merc = new Car('Mercedes', 100);
// bmw.accelerate();
// bmw.accelerate();
// merc.brake();
// merc.brake();

// ************** ES6 CLASSES **************
// 1. CLASSES ARE NOT HOISTED -> CANNOT BE USED BEFORE DECLARATION
// 2. CLASSES ARE FIRST-CLASS CITIZENS -> CAN PASS AND RETURN THEM INTO FUNCTIONS
// 3. CLASSES ARE EXECUTED IN STRICT MODE

// CLASS EXPRESSION -> DON'T USE ARGUMENTS
// const PersonExpression = class {
//   constructor(secondName, birthMonth) {
//     this.secondName = secondName;
//     this.birthMonth = birthMonth;
//   }
//   // METHOD WILL BE ADDED TO THE .prototype
//   calcMonth() {
//     console.log(12 - this.birthMonth);
//   }
// };

// // CLASS DECLARATION
// class PersonDeclaration {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   // METHOD WILL BE ADDED TO THE .prototype
//   calcAge() {
//     console.log(2022 - this.birthYear);
//   }
//   // USING GET METHOD IN CLASSES
//   get age() {
//     return 2022 - this.birthYear;
//   }
//   // USING SET IN A PROPERTY THAT ALREADY EXISTS
//   set fullName(name) {
//     if (name.includes(' '))
//       this._fullName = name; // USE UNDERLINE TO CREATE NEW PROPERTY
//     else alert(`${name} is not a full name!`);
//   }
//   // NECESSARY TO CREATE A GET FOR THE NEW PROPERTY
//   get fullName() {
//     return this._fullName;
//   }
//   // DECLARING A STATIC METHOD ON CLASSES
//   static hey() {
//     console.log('Hey there 👋');
//   }
// }

// PersonDeclaration.hey();

// const jonas = new PersonExpression('Jonas', 10);
// const jessica = new PersonDeclaration('Jessica Davis', 1992);
// jonas.calcMonth();
// jessica.calcAge();
// console.log(jessica);
// console.log(jessica.age); // USING THE GET PROPERTY

// ************** GETTERS & SETTERS **************
// const account = {
//   owner: 'Thomaz',
//   movements: [200, 150, 210, 340],
//   // METHOD WITH GET
//   get latestMov() {
//     return this.movements.slice(-1).pop();
//   },
//   // METHOD WITH SET
//   set latestMov(mov) {
//     this.movements.push(mov);
//   },
// };

// console.log(account.latestMov); // USE OF GET PROPERTY
// account.latestMov = 130; // USE OF SET PROPERTY
// console.log(account.movements);

// ************** FUNCTION OBJECT.CREATE **************
// const PersonProto = {
//   // CONSTRUCTOR LIKE FUNCTION TO PARAMETERS
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
//   calcAge() {
//     console.log(2022 - this.birthYear);
//   },
// };

// const steven = Object.create(PersonProto);
// console.log(steven);
// steven.name = 'Steven';
// steven.birthYear = 1994;
// steven.calcAge();

// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1997);
// sarah.calcAge();

// // ************** CHALLENGE #2 **************
// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} going at ${this.speed} km/h`);
//   }
//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} going at ${this.speed} km/h`);
//   }
//   get speedUS() {
//     return this.speed / 1.6;
//   }
//   set speedUS(km) {
//     this.speed = km * 1.6;
//     return this.speed;
//   }
// }

// const ford = new Car('Ford', 120);
// console.log(ford.speedUS, 'm/h');
// ford.accelerate();
// ford.accelerate();
// ford.brake();
// ford.brake();
// ford.speedUS = 50;
// console.log(ford);

// ************** INHERITANCE BETWEEN "CLASSES" **************
// ************** WITH CONSTRUCTOR FUNCTIONS **************
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2022 - this.birthYear);
// };

// // CHILD CLASS
// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// // CONNECTION BETWEEN PROTOTYPES
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const mike = new Student('Mike', 1994, 'Computer Science');
// mike.introduce();
// mike.calcAge();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.log(mike instanceof Person); // TRUE
// console.log(mike instanceof Student); // TRUE

// ************** CHALLENGE #3 **************
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };
// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
//   console.log(`Battery charged to ${this.charge}%`);
// };
// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(
//     `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);
// tesla.accelerate();
// tesla.chargeBattery(90);
// tesla.accelerate();
// tesla.brake();
// tesla.accelerate();

// ************** INHERITANCE BETWEEN "CLASSES" **************
// ************** WITH CLASSES **************
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   // METHOD WILL BE ADDED TO THE .prototype
//   calcAge() {
//     console.log(2022 - this.birthYear);
//   }
//   // USING GET METHOD IN CLASSES
//   get age() {
//     return 2022 - this.birthYear;
//   }
//   // USING SET IN A PROPERTY THAT ALREADY EXISTS
//   set fullName(name) {
//     if (name.includes(' '))
//       this._fullName = name; // USE UNDERLINE TO CREATE NEW PROPERTY
//     else alert(`${name} is not a full name!`);
//   }
//   // NECESSARY TO CREATE A GET FOR THE NEW PROPERTY
//   get fullName() {
//     return this._fullName;
//   }
//   // DECLARING A STATIC METHOD ON CLASSES
//   static hey() {
//     console.log('Hey there 👋');
//   }
// }

// // CHILD CLASS
// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     // SUPER ALWAYS NEEDS TO HAPPEN FIRST!
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}.`);
//   }
//   // OVERWRITING THE PARENT METHOD
//   calcAge() {
//     console.log(`I'm ${2022 - this.birthYear} years old.`);
//   }
// }

// const martha = new StudentCl('Martha Jones', 2000, 'Computer Science');
// martha.introduce();
// martha.calcAge();

// ************** INHERITANCE BETWEEN "CLASSES" **************
// ************** WITH OBJECT.CREATE **************
// const PersonProto = {
//   calcAge() {
//     console.log(2022 - this.birthYear);
//   },
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// // CHILD CLASS
// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };
// StudentProto.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const jay = Object.create(StudentProto);
// jay.init('Jay', 2000, 'Computer Science');
// jay.introduce();
// jay.calcAge();

// ************** ANOTHER CLASS EXAMPLE **************
// class Account {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     // PROTECTED PROPERTY
//     this._pin = pin;
//     this._movements = [];
//     this.locale = navigator.language;
//     console.log(`Thanks for opening an account, ${this.owner}`);
//   }
//   // PUBLIC INTERFACE - API
//   deposit(val) {
//     this._movements.push(val);
//   }
//   withdraw(val) {
//     this._movements.push(-val);
//     // OR CALL THE DEPOSIT METHOD ITSELF
//     // this.deposit(-val);
//   }
//   getMovements() {
//     return this._movements;
//   }
//   // PROTECTED METHOD
//   _approveLoan(val) {
//     return true;
//   }
//   requestLoan(val) {
//     if (this._approveLoan(val)) {
//       this.deposit(val);
//       console.log('Loan approved');
//     }
//   }
// }

// const acc1 = new Account('Thomaz', 'REAL', 1234);
// acc1.deposit(250);
// acc1.withdraw(140);
// console.log(acc1);

// ************** PRIVATE CLASS FIELDS & METHODS **************
// ************** 1-PUBLIC FIELD 2-PRIVATE FIELD 3-PUBLIC METHOD 4-PRIVATE METHOD **************
// class Account {
//   // 1-PUBLIC FIELDS (AVAILABLE ON INSTANCES)
//   locale = navigator.language;
//   // 2-PRIVATE FIELDS (AVAILABLE ON INSTANCES)
//   #movements = [];
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     // 2-PRIVATE FIELDS
//     this.#pin = pin;
//     console.log(`Thanks for opening an account, ${this.owner}`);
//   }
//   // 3-PUBLIC METHODS
//   // PUBLIC INTERFACE - API
//   deposit(val) {
//     this.#movements.push(val);
//     return this;
//   }
//   withdraw(val) {
//     this.#movements.push(-val);
//     return this;
//     // OR CALL THE DEPOSIT METHOD ITSELF
//     // this.deposit(-val);
//   }
//   getMovements() {
//     return this.#movements;
//   }
//   requestLoan(val) {
//     if (this.#approveLoan(val)) {
//       this.deposit(val);
//       console.log('Loan approved');
//       return this;
//     }
//   }
//   // 4-PRIVATE METHOD
//   #approveLoan(val) {
//     return true;
//   }
// }

// const acc1 = new Account('Thomaz', 'REAL', 1234);
// acc1.deposit(250);
// acc1.withdraw(140);
// console.log(acc1);
// //console.log(acc1.#movements); NOT ACCESSIBLE BECAUSE ITS PRIVATE
// // console.log(acc1.#pin); NOT ACCESSIBLE BECAUSE ITS PRIVATE
// // console.log(acc1.#approveLoan(100)); NOT ACCESSIBLE BECAUSE ITS PRIVATE

// // ************** CHAINING METHODS **************
// acc1.deposit(2000).deposit(350).withdraw(1800);
// console.log(acc1.getMovements());

// ************** CHALLENGE #4 **************
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
    return this;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(km) {
    this.speed = km * 1.6;
    return this.speed;
  }
}

class EvCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`Battery charged to ${this.#charge}%`);
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const rivian = new EvCl('Rivian', 120, 23);
console.log(rivian);
rivian.accelerate();
rivian.brake();
rivian.chargeBattery(75).accelerate().brake();
console.log(rivian.speedUS);
