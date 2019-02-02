var randomMin = 0; // lowest number for ID
var randomMax = 999; // highest number for ID

var id;
var formattedID;
var firstName;
var lastName;

var heightInches;
var heightImperialFeet;
var heightImperialInches;
var heightMetric;
var bmi;
var weightImperial;
var weightMetric;

var emotionalWeight;
var armStrength;
var driverRating;
var laughter;

var hairColor;
var blushColor;

function randomDad() {
    calculateStats();

    document.getElementById('id').innerHTML = "#" + formattedID;
    document.getElementById('name').innerHTML = firstName + " " + lastName;
    document.getElementById('height').innerHTML = heightImperialFeet + " ft " + heightImperialInches + " inches (" + heightMetric + " cm)";
    document.getElementById('weight').innerHTML = weightImperial + " lbs (" + weightMetric + " kg)";
    document.getElementById('emotion').innerHTML = emotionalWeight + "lbs";
    document.getElementById('strength').innerHTML = armStrength + "lbs";
    document.getElementById('uber').innerHTML = driverRating + " stars";
    document.getElementById('laugh').innerHTML = laughter + " dB";
    document.getElementById('bio').innerHTML = bio();

    generateFace();
}


// ================== Calculations to do ==================

function calculateStats() {
    generateID();
    generateName();
    calculateHeight();
    calculateBMI();
    calculateWeight();
    calculateEmotionalWeight();
    calculateArmStrength();
    calculateDriverRating();
    calculateLaughter();
    calculateColors();
}


// ================== Generation Functions ==================

// pick a random ID
// [000, 999]
function generateID() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
    var randomNumber = Math.floor(Math.random() * (randomMax - randomMin + 1)) + randomMin;
    id = randomNumber;

    formattedID = id;
    if (id < 100) {
        formattedID = "0" + formattedID;
        if (id < 10) {
            formattedID = "0" + formattedID;
        }
    }
}

// pick a random first name and last name
function generateName() {
    firstName = names[id%names.length];
    lastName = surnames[surnames.length - 1 - Math.round(id*1.3)%surnames.length];
}

// generate a random height
// [5'3", 6'7"]
function calculateHeight() {
    var x = formattedID;
    if ((x*7).toString().charAt(0)%2 == 0) { // pick either 5 or 6 feet
        var feet = 6;
    } else {
        var feet = 5;
    }
    x = x%100;
    var min;
    var max;
    if (feet == 5) {
        min = 3;
        max = 11;
    } else {
        min = 0;
        max = 7;
    }
    var inches = Math.ceil(min + (x)*(max-min)/(99)); // pick additional inches

    heightInches = inches + (feet * 12); // TOTAL height in inches
    heightImperialFeet = feet; // just feet part of height
    heightImperialInches = inches; // just inches part of height
    heightMetric = Math.round(heightInches * 2.54); // TOTAL height in cm
}

// generate a random BMI
// [19, 28]
function calculateBMI() {
    var temp = id;
    var x = 0; // add the digits of id [00, 27]
    while (temp > 0) {
        x += temp % 10;
        temp = Math.floor(temp/10);
    }
    x = Math.round(x/3); // turn [00, 27] to [0, 9]
    x = 10-x; // flip [0, 9] to [9, 0]
    bmi = x + 17; // [0, 9] to [17, 26]
}

// Calculate weight based on height and BMI
// [unknown range]
function calculateWeight() {
    // http://www.scymed.com/en/smnxpn/pndhc226.htm
    // weight (lb) = BMI * (height, inch)^2 / 704
    weightImperial = Math.round(bmi * heightInches * heightInches / 704);
    weightMetric = Math.round(weightImperial/2.204);
}

// Calculate emotional weight based on last name
// [194, 244]
function calculateEmotionalWeight() {
    var x = lastName.charCodeAt(lastName.length-1); // [97, 122]
    emotionalWeight = x*2; // [194, 244]
}

// Calculate arm strength based on id and weight
// [unknown range]
function calculateArmStrength() {
    // https://strengthlevel.com/strength-standards/dumbbell-curl/lb
    // Determine level (beginner to advanced) based on id
    var strength = 0;
    var temp = id;
    var x = 1; // second digit of id * third digit
    while (temp >= 10) {
        x = x * (temp % 10);
        temp = Math.floor(temp/10);
    }
    x += temp; // ... + first digit of id [0, 81]
    x = x%4; // ... now [0,3]

    switch (x) {
        case 0: // Beginner (0) : weight * 0.1
            strength = weightImperial * 0.1;
            break;
        case 1: // Novice (1) : weight * 0.17
            strength = weightImperial * 0.17;
            break;
        case 2: // Intermediate (2) : weight * 0.3
            strength = weightImperial * 0.3;
            break;
        case 3: // Advanced (3) : weight * 0.42
            strength = weightImperial * 0.42;
            break;
        default:
            break;
    }
    armStrength = Math.round(strength);
}

// Calculate driver rating based on emotional strength and id
// [3.90, 5.00]
function calculateDriverRating() {
    var emotion = emotionalWeight; // [194, 244]
    var x = id%10; // [0-9]
    var i = emotion-x; // [185, 244]
    i = 3.9 + (i-185)*(5-3.9)/(244-185); // map [185, 244] to [3.9-5]
    driverRating = Math.round(i*100)/100; // two decimal points
}

// Calculate laughter based on weight
// [50?, 75?] unknown
function calculateLaughter() {
    // https://www.tlc-direct.co.uk/Technical/Sounds/Decibles.htm
    var w = weightImperial;
    var x = Math.floor(w/10); // first two digits of weight [14, 21?]
    var y = Math.floor(w%10/2); // last digit of weight [0, 4]
    var z = x-y; // [10, 21]
    laughter = Math.round(50 + (z-10)*(75-50)/(21-10)); // map [10, 21] to [50-75]
}

function calculateColors() {
    // 000000 -
    hairColor = "#cecece";
    blushColor = "#FF9FAB";
}