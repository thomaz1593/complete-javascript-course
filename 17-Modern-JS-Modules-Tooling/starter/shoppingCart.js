// ********** IMPORTING AND EXPORTING MODULES // **********
// EXPORTING MODULE
console.log('exporting module...');

const shippingCost = 10;
export const cart = [];

// ********** NAMED EXPORTS **********
// if (true) { export const addToCart() }// DON'T WORK BECAUSE EXPORT NEED TO HAPPEN IN TOP LEVEL CODE
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart.`);
};

// EXPORTING MULTIPLE VALUES
const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// ********** DEFAULT EXPORTS **********
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart.`);
}
