'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// PARENT CLASS FOR BOTH WORKOUT TYPES
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10); // CONVERTING TO STRING AND PICKING THE LAST 10 NUMBERS
  clicks = 0;
  constructor(coords, distance, duration) {
    this.coords = coords; // IN [LAT, LNG]
    this.distance = distance; // IN KM
    this.duration = duration; // IN MIN
  }

  _setDescription() {
    // THE COMMENT BELLOW TELLS PRETTIER TO IGNORE THE FORMATION
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // TAKE THE FIRST LETTER OF TYPE AND MAKE IT UPPERCASE AND CONCAT ALL TOGETHER WITH DATE OF WORKOUT
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  // COUNTS THE NUMBER OF TIMES AN OBJECT IS CLICKED
  click() {
    this.clicks++;
  }
}

// CHILD CLASS
class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    // CALCULATE IN MIN/KM
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

// CHILD CLASS
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    // CALCULATE IN KM/H
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// APPLICATION ARCHITECTURE
class App {
  #map;
  #mapZoomLevel = 16;
  #mapEvent;
  #workouts = [];
  constructor() {
    this._getPosition(); // CALL _GETPOSITION() WHEN PAGE LOADS AND OBJECT IS INSTANCED

    // EVENT TO CREATE MARKER WHEN FORM IS
    // BIND() METHOD TO RETURN NEW FUNCTION AND THIS OBJECT ITSELF TO APP
    // USE BIND METHOD EVERY TIME YOU NEED THE THIS KEYWORD ON METHOD CALLED AS EVENT LISTENER
    form.addEventListener('submit', this._newWorkout.bind(this));

    // EVENT TO WATCH INPUT TYPE CHANGES AND SHOW ELEVATION OR CADENCE FIELDS
    inputType.addEventListener('change', this._toggleElevationField);

    // ATTACHING EVENT ON PARENT ELEMENT OF MARKER BECAUSE IT NOT EXISTS IN THE BEGINNING
    // EVENT TO MOVE THE MAP TO WORKOUT LIST ELEMENT WHEN CLICKED ON
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

    // GET DATA FROM LOCAL STORAGE
    this._getLocalStorage();
  }

  _getPosition() {
    // USING THE GEOLOCATION API
    if (navigator.geolocation) {
      // CALLBACK FUNCTION TO CALL _LOADMAP() IF SUCCESS GET GEOLOCATION
      // BIND METHOD TO RETURN NEW FUNCTION AND THIS OBJECT ITSELF TO _LOADMAP()
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position'); // OR ALERT IF NOT GET GEOLOCATION
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords; // DESTRUCTURING, SAME THING AS latitude = position.coords.latitude
    const { longitude } = position.coords; // DESTRUCTURING, SAME THING AS longitude = position.coords.longitude
    const coords = [latitude, longitude]; // OBJECT THAT STORE BROWSER COORDINATES

    //  USING LEAFLET API
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel); // 'MAP' IS THE ID OF THE HTML DIV TO SHOW
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // LEAFLET ON() METHOD TO CREATE MARKER WHEN MOUSE CLICK ON MAP AND CALL _SHOWFORM()
    // BIND() METHOD TO RETURN NEW FUNCTION AND THIS OBJECT ITSELF TO APP
    this.#map.on('click', this._showForm.bind(this));

    // RENDER THE MARKERS OF LOCAL STORAGE AFTER MAP IS LOADED
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden'); // REMOVE CLASS 'HIDDEN' TO SHOW FORM WHEN CLICKED ON MAP
    inputDistance.focus();
  }

  _hideForm() {
    // CLEAR INPUT FIELDS
    // prettier-ignore
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    form.style.display = 'none'; // SET DISPLAY TO NONE TO REMOVE THE SLIDE ANIMATION
    form.classList.add('hidden'); // HIDE THE FORM BY ADDING THE CLASS HIDDEN
    setTimeout(() => (form.style.display = 'grid'), 1000); // SET DISPLAY BACK TO GRID AFTER 1 SECOND
  }

  _toggleElevationField() {
    // SHOW ELEVATION OR CADENCE FIELDS
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden'); // CLOSEST() TO SELECT PARENT ELEMENT OF INPUT
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden'); // CLOSEST() TO SELECT PARENT ELEMENT OF INPUT
  }

  _newWorkout(e) {
    e.preventDefault(); // PREVENT PAGE TO AUTO RELOAD WHEN PRESSED ENTER, SUBMIT

    // HELPER FUNCTION TO CHECK IF DATA INPUT IS VALID
    const validInputs = (...inputs) =>
      inputs.every(input => Number.isFinite(input)); // LOOP EVERY ELEMENT OF ARRAY AND ONLY RETURN TRUE IF ALL ITS VALID
    const allPositives = (...inputs) => inputs.every(input => input > 0); // RETURN TRUE IF ITS GREATER THAN 0

    // GET DATA FROM FORM
    const type = inputType.value; // GET HTML VALUE FROM OPTION INPUT
    const distance = +inputDistance.value; // CONVERT STRING VALUE OF INPUT TO NUMBER
    const duration = +inputDuration.value; // CONVERT STRING VALUE OF INPUT TO NUMBER
    const { lat, lng } = this.#mapEvent.latlng; // OBJECT THAT STORE LAT/LNG POINT WHEN CLICKED
    let workout; // OBJECT

    // IF WORKOUT TYPE IS RUNNING, CREATE RUNNING OBJECT
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // CHECK IF DATA INPUT IS VALID, A POSITIVE NUMBER
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositives(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers.');
      // CREATING A NEW RUNNING OBJECT
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // IF WORKOUT TYPE IS CYCLING, CREATE CYCLING OBJECT
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      // CHECK IF DATA INPUT IS VALID, A POSITIVE NUMBER
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositives(distance, duration)
      )
        return alert('Inputs have to be positive numbers.');
      // CREATING A NEW CYCLING OBJECT
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // ADD NEW OBJECT TO WORKOUT ARRAY
    this.#workouts.push(workout);

    // RENDER WORKOUT ON MAP AS A MARKER
    this._renderWorkoutMarker(workout);

    // RENDER WORKOUT ON LIST
    this._renderWorkoutList(workout);

    // CLEAR INPUT FIELDS + HIDE FORM
    this._hideForm();

    // SET BROWSER LOCAL STORAGE TO ALL WORKOUTS
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    // DISPLAY THE MARKER WITH LEAFLET
    L.marker(workout.coords) // PROPERTY COORDS FROM WORKOUT OBJECT
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          // OBJECT WITH MARKER PROPERTIES
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`, // CSS STYLE CLASS DEPENDING OF THE TYPE OF CHILD OBJECT
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      ) // TITLE OF THE MARKER
      .openPopup();
  }

  _renderWorkoutList(workout) {
    // DOM MANIPULATION TO WHAT BOTH WORKOUT TYPES HAVE IN COMMON
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;
    // APPEND THE REST OF THE HTML OF RUNNING TYPE
    if (workout.type === 'running') {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;
    }
    // APPEND THE REST OF THE HTML OF CYCLING TYPE
    if (workout.type === 'cycling') {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;
    }
    // INSERT ELEMENT INTO HTML CLOSE TO THE FORM ELEMENT, AS A SIBLING
    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    // CAPTURE THE CLOSEST ELEMENT CLICKED WITH WORKOUT CLASS
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return; // IF WORKOUT DON'T EXISTS, RETURN

    // CHECK EVERY WORKOUT IN ARRAY TO MATCH THE ID OF THE CLICKED WORKOUT
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    // LEAFLET SETVIEW METHOD TO MOVE THE MAP TO SOME LOCATION
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // USING THE PUBLIC INTERFACE
    // DISABLING BECAUSE WHEN WE CONVERT THE OBJECT TO STRING AND BACK TO OBJECT,
    // THE OBJECT LOSES IT'S PROTOTYPE CHAIN, MAKING IT CLICK METHOD NOT FUNCTIONAL ANYMORE
    // workout.click();
  }

  _setLocalStorage() {
    // USING BROWSER API
    localStorage.setItem('workouts', JSON.stringify(this.#workouts)); // PASSING A KEY AND VALUE. CONVERTING OBJECT WORKOUTS TO STRING
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts')); // PASSING A KEY TO GET VALUE. CONVERTING STRING BACK TO OBJECT
    if (!data) return;

    this.#workouts = data; // RESTORING THE DATA TO WORKOUTS ARRAY
    // RENDER WORKOUTS IN THE LIST
    this.#workouts.forEach(work => {
      // PASSING EACH ITERATION OF ARRAY TO BE RENDERED
      this._renderWorkoutList(work);
    });
  }

  // METHOD TO DELETE THE DATA FROM LOCAL STORAGE
  // USE IT ON CONSOLE WITH APP VARIABLE
  reset() {
    localStorage.removeItem('workouts');
    location.reload(); // RELOADS THE PAGE
  }
}

// INSTANCE OBJECT APP
const app = new App();
