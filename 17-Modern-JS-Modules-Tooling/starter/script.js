// ********** IMPORTING AND EXPORTING MODULES // **********
// IMPORTING MODULE
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

console.log('importing module...');

// // ********** NAMED EXPORTS **********
// addToCart('bread', 5);
// console.log(price, tq);

// IMPORTING EVERYTHING OF SHOPPINGCART AT ONCE
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);

// ********** DEFAULT EXPORTS **********
// import add from './shoppingCart.js'; // IMPORT THE DEFAULT EXPORT AND GIVE IT A NAME
// add('pizza', 2);

// DEFAULT AND NAMED EXPORTS AT SAME TIME
/* NOT A GOOD PRACTICE, AVOID USE
    import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
    add('pizza', 2);
    console.log(price);
 */

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);
console.log(cart);

// ********** TOP-LEVEL AWAIT (ES2022) **********
// console.log('Start fetching...');
// // async function x() { const res = await fetch() } // NOT NECESSARY TO BE INSIDE ASYNC FUNCTION
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Fetching end.');

// REAL WORLD USE OF TOP-LEVEL AWAIT
// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   // RETURNING THE LAST VALUE OF POSTS
//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// const lastPost = getLastPost(); // RETURN AN ARRAY OF PROMISE
// lastPost.then(last => console.log(last)); // NOT VERY CLEAN WAY TO DO IT

// const lastPostAwait = await getLastPost();
// console.log(lastPostAwait); // USING TOP-LEVEL AWAIT

// ********** MODULE PATTERN **********
// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to the cart.`);
//   };

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered from supplier.`);
//   };

//   // PROPERTIES THAT WE WANT TO EXPORT
//   return {
//     addToCart,
//     cart,
//     totalQuantity,
//     totalPrice,
//   };
// })();

// ShoppingCart2.addToCart('pineapple', 4);
// ShoppingCart2.addToCart('burger', 3);

// ********** COMMONJS MODULES **********
// EXPORT
// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to the cart.`);
// }

// // IMPORT
// const {addToCart} = require('./shoppingCart.js');

// ********** INTRODUCTION TO NPM **********
// USING _LODASH LIBRARY
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es'; // PARCEL FINDS AND IMPORT THE DEPENDENCY - HOT MODULE

// NESTED OBJECT
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 3 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state); // CLONING NESTED OBJECT WITH VANILLA JS
const stateCloneDeep = cloneDeep(state); // CLONING USING _LODASH CLONEDEEP

state.user.loggedIn = false; // CHANGING THE ORIGINAL OBJECT WILL AFFECT THE VANILLA CLONE BUT NOT THE CLONEDEEP
console.log(stateClone); // AFFECTED
console.log(stateCloneDeep); // NOT AFFECTED

// ********** PARCEL BUNDLING **********
// HOT MODULE REPLACEMENT FOR NOT RELOADING THE PAGE
if (module.hot) {
  module.hot.accept(); // BROWSER DON'T UNDERSTAND THIS COMMAND BUT PARCEL DOES
}
