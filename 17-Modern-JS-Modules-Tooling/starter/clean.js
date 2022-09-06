'strict mode';
// var budget = [
//   { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
//   { value: -45, description: 'Groceries 🥑', user: 'jonas' },
//   { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
//   { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
//   { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
//   { value: -20, description: 'Candy 🍭', user: 'matilda' },
//   { value: -125, description: 'Toys 🚂', user: 'matilda' },
//   { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
// ];

// var limits = {
//   jonas: 1500,
//   matilda: 100,
// };

// var add = function (value, description, user) {
//   if (!user) user = 'jonas';
//   user = user.toLowerCase();

//   var lim;
//   if (limits[user]) {
//     lim = limits[user];
//   } else {
//     lim = 0;
//   }

//   if (value <= lim) {
//     budget.push({ value: -value, description: description, user: user });
//   }
// };
// add(10, 'Pizza 🍕');
// add(100, 'Going to movies 🍿', 'Matilda');
// add(200, 'Stuff', 'Jay');
// console.log(budget);

// var check = function () {
//   for (var el of budget) {
//     var lim;
//     if (limits[el.user]) {
//       lim = limits[el.user];
//     } else {
//       lim = 0;
//     }

//     if (el.value < -lim) {
//       el.flag = 'limit';
//     }
//   }
// };
// check();

// console.log(budget);

// var bigExpenses = function (limit) {
//   var output = '';
//   for (var el of budget) {
//     if (el.value <= -limit) {
//       output += el.description.slice(-2) + ' / '; // Emojis are 2 chars
//     }
//   }
//   output = output.slice(0, -2); // Remove last '/ '
//   console.log(output);
// };

// ********** FIXING BAD CODE WITH GOOD PRACTICE **********
// CHANGING VAR KEYWORD ON ENTIRE CODE FOR CONST OR LET AND MAKING OBJECT IMMUTABLE
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// CHANGE NAME TO MAKE MORE SENSE AND MAKING OBJECT IMMUTABLE WITH FREEZE
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// CREATE THE FUNCTION GETLIMIT TO REPLACE THE REPEATED CODE
const getLimit = (limits, user) => (limits ? spendingLimits[user] : 0);
/* OR USE OPTIONAL CHAINING ? TO CHECK IF USER EXISTS AND SETS ITS VALUE. IF NOT, 
    KNOWLEDGE COALESCING OPERATOR TO SET TO ZERO */
// const getLimit = user => (spendingLimits?.[user] ?? 0);

// FIXING THE BAD NAME OF THE FUNCTION ADD
// ADDED DEFAULT PARAMETER
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();
  // REPLACED THE NESTED IF SPENDINGLIMITS TO TERNARY OPERATOR -> FUNCTION GETLIMIT
  return value <= getLimit(limits, cleanUser)
    ? // CREATE A COPY OF STATE AND ADD NEW PROPERTY ON OBJECT
      [...state, { value: -value, description, user: cleanUser }]
    : state;
  // budget.push({ value: -value, description, user: cleanUser });
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// CHANGE CHECK FUNCTION NAME TO BE MORE CLEAR
const checkExpenses = function (state, limits) {
  // REPLACED THE NESTED IF TO GETLIMIT FUNCTION
  // for (const entry of newBudget3)
  //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });
};
const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// CHANGE PARAMETER NAME TO BE MORE CLEAR
const logBigExpenses = function (state, bigLimit) {
  // let output = '';
  // for (const entry of budget) {
  //   // REPLACE IF TO TERNARY OPERATOR AND THE STRING TO A TEMPLATE STRING
  //   // TAKING THE LAST 2 CHARACTERS OUT OF STRING BECAUSE EMOJIS COUNTS AS 2 CHARACTERS
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  console.log(bigExpenses);
};

logBigExpenses(finalBudget, 1000);
