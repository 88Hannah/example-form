/**************************************
 *           Email address            *
 **************************************/

// Pre submission checks
const email = document.getElementById('email');
const validateEmail = document.querySelector('.validate-email');
const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

email.addEventListener('change', () => {
    if (!regex.test(email.value)) {
        validateEmail.style.display = 'block';
        email.style.borderColor = "red";
    } else {
        validateEmail.style.display = 'none';
        email.style.borderColor = "initial";
    }
});



/**************************************
 *            Phone Number            *
 **************************************/

const phoneNumber = document.getElementById('phone-number');
const validatePhone = document.querySelector('.validate-phone');

// Pre submission checks
phoneNumber.addEventListener('change', () => {
    if (!phoneNumber.value.replace(/[\s*()+-]/g,"").match(/\d{10,}/g)) {
        validatePhone.style.display = 'block';
        phoneNumber.style.borderColor = "red";
    } else {
        validatePhone.style.display = 'none';
        phoneNumber.style.borderColor = "initial";
    }
});



/**************************************
 *        Restaurant Location         *
 **************************************/

const submit = document.getElementById('submit');

const form = document.querySelector('.booking-form');

const restaurant = document.getElementById('location');
const validateRestaurant = document.querySelector('.validate-location');

submit.addEventListener('click', event => {
    if(restaurant.selectedIndex === 0) {
        event.preventDefault();
        validateRestaurant.style.display = 'block';
        restaurant.style.borderColor = "red";
    } else {
        validateRestaurant.style.display = 'none';
        restaurant.style.borderColor = "initial";
    };

    // Check if no. og guests has been selected
    emptyGuestValidation();
});



/**************************************
 *           Booking Date             *
 **************************************/

const date = document.getElementById('date');

const todayYear = new Date().getFullYear();
let todayMonth = new Date().getMonth();
let todayDay = new Date().getDate();

// Turn day and month into a two digit string
todayDay = String(todayDay).padStart(2, '0');
todayMonth = String(todayMonth + 1).padStart(2, '0');

// Set minimum date to today and maximum date to a year from now
date.setAttribute("min", `${todayYear}-${todayMonth}-${todayDay}`);
date.setAttribute("max", `${todayYear + 1}-${todayMonth}-${todayDay}`);

// Pre submission checks
const validateDate = document.querySelector('.validate-date');

date.addEventListener('focusout', () => {
    if (date.value < date.min || date.value > date.max) {
        validateDate.style.display = 'block';
        date.style.borderColor = "red";
    } else {
        validateDate.style.display = 'none';
        date.style.borderColor = "initial";
    }
});



/**************************************
 *           Booking Time             *
 **************************************/

const timeOptions = document.getElementById('times');
const hours = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
const minutes = ['00', '15', '30', '45'];
let times = [];

// Create an array of all the possible booking times
hours.forEach((hour, index) => {
    if (index !== hours.length - 1) {
        minutes.forEach(minute => {
            times.push(`${hour}:${minute}`);
        });
    } else if (index === hours.length - 1) {
        times.push(`${hour}:00`)
    };
});

// Add each time as an option in the times datalist
times.forEach(time => {
    timeOptions.insertAdjacentHTML('beforeend', `<option>${time}<option>`);
});

// Pre submission checks
const time = document.getElementById('time');
const validateTime = document.querySelector('.validate-time');

time.addEventListener('focusout', () => {
    if (time.value < time.min || time.value > time.max || (time.value.slice(-2) !== "00" && time.value.slice(-2) !== "15" && time.value.slice(-2) !== "30" && time.value.slice(-2) !== "45")) {
        validateTime.style.display = 'block';
        time.style.borderColor = "red";
    } else {
        validateTime.style.display = 'none';
        time.style.borderColor = "initial";
    }
});



/**************************************
 *               Guests               *
 **************************************/

const emptyGuestValidation = () => {
    if (!guests.value) {
        validateGuests.style.display = 'block';
        guests.style.borderColor = "red";
    } else {
        validateGuests.style.display = 'none';
        guests.style.borderColor = "initial";
    };
};

const guests = document.getElementById('guests');
const popup = document.querySelector('.popup__text');
const closePopup = document.querySelector('.close-popup');
const validateGuests = document.querySelector('.validate-guests');

// Pre validation checks
guests.addEventListener('change', () => {
    if(guests.value > 12){
        popup.classList.add('show-popup');
    
        closePopup.addEventListener('click', () => {
            popup.classList.remove('show-popup');
        });
    };

    emptyGuestValidation();
});



/**************************************
 *       Special Requirements         *
 **************************************/

const yes = document.getElementById('yes');
const no = document.getElementById('no');

const specialRequirements = document.getElementById('special-requirements');
const specialRequirementsBlock = document.querySelector('.special-requirements-block');

// Display the special requirements box if yes is selected
yes.addEventListener('click', () => {
        specialRequirementsBlock.style.display = 'block';
        specialRequirements.required = true;
});

// Hide the special requirements box if no is selected
no.addEventListener('click', () => {
        specialRequirementsBlock.style.display = 'none';
        specialRequirements.required = false;
});



/**************************************
 *           Form Submission          *
 **************************************/

const getSpecialRequirements = () => {
    let requirements = "";
    
    if(specialRequirements.value) {
        requirements = `
            <p>The restaurant will be made aware of your requirement(s):</p>
            <p>${specialRequirements.value}</p>
        `;
    }

    return requirements
};


form.addEventListener('submit', e => {
    
    const submitted = document.querySelector('.submitted');
    const name = document.getElementById('name');

    //As there is no back end to return data, prevent the page reload
    e.preventDefault();
    
    form.style.display = "none";

    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    let bookingDate = new Date(date.value);
    bookingDate = bookingDate.toLocaleDateString('en-GB', options);

    const specialRequirementsText = getSpecialRequirements();

    const markup = `
        <p>Hi ${name.value},<p>
        <p>Thank you for choosing to visit one of our restaurants.</p>
        <p>A table for ${guests.value} has been booked for you at our ${restaurant.value} restaurant 
        on ${bookingDate} at ${time.value}.
        ${specialRequirementsText}
        <p>We look forward to seeing you.</p>
    `;

    submitted.innerHTML = markup;
});