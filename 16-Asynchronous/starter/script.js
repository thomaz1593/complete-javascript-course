'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// ********** API LINK: https://restcountries.com/v2/ **********

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1; // TRANSFERRED TO FINALLY METHOD
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1; // TRANSFERRED TO FINALLY METHOD
};

// CREATING A HELPER FUNCTION TO GET URL DATA, CONVERT TO JSON AND DEAL WITH ERRORS
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    // CREATING A MANUAL ERROR MESSAGE FOR UNDEFINED COUNTRY
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// ********** AJAX CALL - HTMLHttpRequest **********
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   // console.log(request.responseText); // DON'T WORK BECAUSE REQUEST IT'S NOT LOADED YET

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText); // DESTRUCTURING OF REQUEST AND CONVERTING
//     console.log(data);

//     const html = `
//     <article class="country">
//         <img class="country__img" src="${data.flag}" />
//         <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//         </div>
//     </article>
//   `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('brazil');
// getCountryData('usa');

// ********** CALLBACK HELL: CALLING MULTIPLES CALLBACKS AFTER ANOTHER **********
// const getCountryDatAndNeighbor = function (country) {
//   // AJAX CALL COUNTRY #1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   // console.log(request.responseText); // DON'T WORK BECAUSE REQUEST IT'S NOT LOADED YET

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText); // DESTRUCTURING OF REQUEST AND CONVERTING
//     console.log(data);
//     // RENDER COUNTRY #1
//     renderCountry(data);

//     // GET NEIGHBOR COUNTRY (#2)
//     const neighbor = data.borders?.[0]; /* ** SAME THING AS
//     const [neighbor] = data.borders;
//     if (!neighbor) return; ** */
//     // AJAX CALL COUNTRY #2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       // RENDER COUNTRY #2
//       renderCountry(data2, 'neighbour');

//       // GET NEIGHBOR COUNTRY (#3)
//       const neighbor = data.borders?.[1];
//       // AJAX CALL COUNTRY #3
//       const request3 = new XMLHttpRequest();
//       request3.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
//       request3.send();

//       request3.addEventListener('load', function () {
//         const data3 = JSON.parse(this.responseText);
//         console.log(data3);
//         // RENDER COUNTRY #3
//         renderCountry(data3, 'neighbour');
//       });
//     });
//   });
// };

// // getCountryDatAndNeighbor('portugal');
// getCountryDatAndNeighbor('usa');
// // getCountryDatAndNeighbor('brazil');

// ********** PROMISES & FETCH API **********
// const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request);

// CONSUMING A PROMISE
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (
//       // IN CASE OF FULFILLED, GET A OBJECT RESPONSE
//       response
//     ) {
//       console.log(response);
//       return response.json(); // RETURN A NEW PROMISE
//     })
//     // DEALING WITH DATA OF THE NEW PROMISE
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// ********** CHAINING PROMISES **********
// SAME EXAMPLE OF CONSUMING A PROMISE BUT WITH ARROW FUNCTION
// const getCountryData = function (country) {
//   // COUNTRY 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     /* FIRST WAY TO DEAL WITH REJECTED PROMISE
//         .then(response => response.json(),
//         err => alert(err)) */
//     .then(response => {
//       console.log(response);
//       // CREATING A MANUAL ERROR MESSAGE FOR UNDEFINED COUNTRY
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       // CHAINING PROMISE
//       const neighbour = data[0].borders?.[0];
//       // COUNTRY 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     // DEALING WITH OFFLINE ERROR -> REJECTED PROMISE
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     // METHOD CALLED INDEPENDENT OF PROMISE REJECT OR FULFILLED
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// const getCountryData = function (country) {
//   // COUNTRY 1
//   getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
//     .then(data => {
//       renderCountry(data[0]);

//       // CHAINING PROMISE
//       const neighbour = data[0].borders?.[0];
//       // COUNTRY 2
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     // DEALING WITH OFFLINE ERROR -> REJECTED PROMISE
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     // METHOD CALLED INDEPENDENT OF PROMISE REJECT OR FULFILLED
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// // getCountryData('portugal');
// btn.addEventListener('click', function () {
//   getCountryData('germany');
// });

// getCountryData('australia');

// ********** CHALLENGE #1 **********
// const whereAmI = function (lat, lng) {
//   return fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=26187001042428245039x85272`
//   )
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`API loading problem. ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}.`);
//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found. ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data[0]);
//       return renderCountry(data[0]);
//     })
//     .catch(err => {
//       console.error(`Something went wrong. ${err.message}`);
//     });
// };

// whereAmI(52.508, 13.381);
// whereAmI(36.2048, 138.2529);
// whereAmI(-33.933, 18.474);

// ********** BUILDING A SIMPLE PROMISE **********
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening... 🔮');
//   // TIMEOUT TO SIMULATE ASYNCHRONOUS BEHAVIOR FOR 2 SECONDS
//   setTimeout(function () {
//     // CHECK RANDOM VALUE BETWEEN 0 AND 1. PROMISE RESOLVED (FULFILLED) WHEN VALUE >= 0.5
//     if (Math.random() >= 0.5) {
//       resolve('Lottery result: You WIN! 💰');
//     } else {
//       // PROMISE REJECTED WHEN VALUE < 0.5
//       reject(new Error('Lottery result: You LOOSE! 💀'));
//     }
//   }, 2000);
// });

// // CONSUMING THE PROMISE
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // PROMISIFYING SETTIMEOUT FUNCTION
// const wait = function (seconds) {
//   // ONLY RESOLVE ARGUMENT BECAUSE IT'S IMPOSSIBLE FOR A TIMER TO FAIL
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// // CONSUMING THE PROMISIFYED FUNCTION
// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 seconds passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 seconds passed'));

// // IMMEDIATELY RESOLVED AND REJECTED PROMISE
// Promise.resolve('Immediately resolved').then(x => console.log(x));
// Promise.reject(new Error('Immediately rejected')).catch(x => console.error(x));

// ********** PROMISIGYING GEOLOCATION API **********
// ASYNCHRONOUS GETTING CURRENT POSITION OBJECT
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );

//     // OR YOU CAN DO THIS SIMPLE VERSION BECAUSE GETCURRENTPOSITION AUTOMATICALLY PASS POSITION VALUE
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // CONSUMING THE PROMISE
// getPosition().then(pos => console.log(pos));

// // PASSING THE CURRENT POSITION AS COORDINATES TO API
// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=26187001042428245039x85272`
//       );
//     })
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`API loading problem. ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}.`);
//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found. ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data[0]);
//       return renderCountry(data[0]);
//     })
//     .catch(err => {
//       console.error(`Something went wrong. ${err.message}`);
//     });
// };

// btn.addEventListener('click', whereAmI);

// ********** CHALLENGE #2 **********
// const imgContainer = document.querySelector('.images');

// const wait = function (seconds) {
//   // ONLY RESOLVE ARGUMENT BECAUSE IT'S IMPOSSIBLE FOR A TIMER TO FAIL
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const newImg = document.createElement('img');
//     newImg.src = imgPath;

//     newImg.addEventListener('load', function () {
//       imgContainer.append(newImg);
//       resolve(newImg);
//     });

//     newImg.addEventListener('error', function () {
//       reject(new Error('Image not found.'));
//     });
//   });
// };

// let currentImage;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// ********** CONSUMING PROMISES WITH ASYNC/AWAIT **********
// PROMISIGYING GEOLOCATION API
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // CONSUMING PROMISE
// const whereAmI = async function () {
//   // ERROR HANDLING WITH TRY
//   try {
//     // GEOLOCATION
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // REVERSE GEOCODING
//     const resGeo = await fetch(
//       `https://geocode.xyz/${lat},${lng}?geoit=json&auth=26187001042428245039x85272`
//     );
//     // HANDLING ERROR MANUALLY
//     if (!resGeo.ok) throw new Error('Problem getting location data.');
//     const dataGeo = await resGeo.json();
//     console.log(dataGeo);

//     // COUNTRY DATA
//     const res = await fetch(
//       `https://restcountries.com/v2/name/${dataGeo.country}`
//     );
//     if (!res.ok) throw new Error('Problem getting country.');
//     console.log(res);
//     const data = await res.json();
//     console.log(data);
//     renderCountry(data[0]);

//     /* EXACTLY THE SAME AS
//     fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(res => console.log(res));
//   */
//     return `You are in ${dataGeo.city}, ${dataGeo.country}.`;
//     // HANDLING ERROR WITH CATCH
//   } catch (err) {
//     console.error(`${err} 💥`);
//     renderError(`💥 ${err.message}`);
//     // REJECT PROMISE RETURNED FROM ASYNC FUNCTION
//     throw err;
//   }
// };

// console.log('1: Will get location');
/* DON'T WORK BECAUSE CAN'T KNOW THE RESOLVE OF PROMISE YET
const city = whereAmI();
console.log(city); */
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

// OR YOU CAN USE IMMEDIATELY INVOKED FUNCTION -> IIFE
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.log(`2: ${err.message} 💥`);
//   }
//   console.log('3: Finished getting location');
// })();

// ********** RUNNING PROMISES IN PARALLEL **********
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // SEQUENCIAL PROMISES
//     // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
//     // console.log([data1.capital, data2.capital, data3.capital]);

//     // RUNNING PARALLEL PROMISES INSTEAD OF SEQUENCIAL
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v2/name/${c1}`),
//       getJSON(`https://restcountries.com/v2/name/${c2}`),
//       getJSON(`https://restcountries.com/v2/name/${c3}`),
//     ]);
//     // LOOP THROUGH ARRAY TO GET NEW ARRAY
//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('brazil', 'portugal', 'japan');

// ********** OTHER PROMISE COMBINATOR: RACE, ALLSETTLED, ANY **********
// PROMISE.RACE
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v2/name/italy`),
//     getJSON(`https://restcountries.com/v2/name/egypt`),
//     getJSON(`https://restcountries.com/v2/name/mexico`),
//   ]);
//   console.log(res[0]); // RETURN VARIES
// })();

// PROMISE THAT IS REJECT AFTER A CERTAIN PERIOD OF TIME
// TIMEOUT PROMISE
// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// // PROMISE TO RACE AGAINST TIMEOUT PROMISE
// Promise.race([getJSON(`https://restcountries.com/v2/name/germany`), timeout(1)])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// // PROMISE.ALLSETTLED
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
//   Promise.reject('Another ERROR'),
// ]).then(res => console.log(res)); // WILL RETURN ALL VALUES

// // PROMISE.ANY
// Promise.any([
//   Promise.resolve('Success'), // WILL RETURN ONLY THIS ONE
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
//   Promise.reject('Another ERROR'),
// ]).then(res => console.log(res));

// ********** CHALLENGE #3 **********
const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  // ONLY RESOLVE ARGUMENT BECAUSE IT'S IMPOSSIBLE FOR A TIMER TO FAIL
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const newImg = document.createElement('img');
    newImg.src = imgPath;

    newImg.addEventListener('load', function () {
      imgContainer.append(newImg);
      resolve(newImg);
    });

    newImg.addEventListener('error', function () {
      reject(new Error('Image not found.'));
    });
  });
};

// PART 1
const loadNPause = async function () {
  try {
    // LOAD IMAGE 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded.');
    await wait(2);
    img.style.display = 'none';

    // LOAD IMAGE 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded.');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

// PART 2
const loadAll = async function (imgArr) {
  try {
    // RETURNING IMAGES AS AN ARRAY OF PROMISE
    // USE OF ASYNC/AWAIT IS NECESSARY IF WE WANT TO MANIPULATE IMG
    const imgs = imgArr.map(async img => await createImage(img));
    /* LIKE THIS
      const imgs = imgArr.map(img => {
        const imgEl = createImage(img);
        imgEl.classList.add('parallel'); // DOING SOMETHING (ERROR)
        return imgEl;
      });
      console.log(imgs);
    */
    console.log(imgs);
    // DEALING WITH ARRAY OF PROMISE
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
