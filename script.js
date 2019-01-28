var randomMin = 0;
var randomMax = 999;
var id = -1;

function randomDad() {
    id = randomNumber();
    document.getElementById('id').innerHTML = "#" + formatID();
    document.getElementById('name').innerHTML = name();
    document.getElementById('height').innerHTML = heightImperial() + " (" + heightMetric() + ")";
    document.getElementById('weight').innerHTML = weightImperial() + " (" + weightMetric() + ")";
    document.getElementById('emotion').innerHTML = emotionalStrength() + "lbs";
    document.getElementById('strength').innerHTML = armStrength() + "lbs";
    document.getElementById('uber').innerHTML = driverRating() + " stars";
    document.getElementById('laugh').innerHTML = laughter() + " dB";
    document.getElementById('bio').innerHTML = bio();
}

function formatID() { // turn ID number into 3 digit
    var formattedID = id;
    if (id < 100) {
        formattedID = "0" + formattedID;
        if (id < 10) {
            formattedID = "0" + formattedID;
        }
    }
    return formattedID;
}

function name() {
    return firstName() + " " + lastName();
}

function firstName() {
    return names[id%names.length];
}

function lastName() {
    return surnames[Math.round(id/2)%surnames.length];
}

function height() { // returns inches
    var feet;
    var inches;

    var x = formatID().toString();
    if ((x*7).toString().charAt(0)%2 == 0) {
        feet = 6;
    } else {
        feet = 5;
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
    inches = Math.ceil(min + (x)*(max-min)/(99));

    var totalInches = inches + (feet * 12);
    return totalInches;
}

function heightImperial() { // returns feet and inches
    var totalInches = height();
    var feet = Math.floor(totalInches/12);
    var inches = totalInches - feet * 12;
    return feet + "ft " + inches + "in";
}

function heightMetric() { // returns centimeters
    var totalInches = height();
    return Math.round(totalInches * 2.54) + "cm";
}

function bmi() { // map to BMI range of 19-28
    var temp = id;
    var x = 0; // add the digits of id (00-27)
    while (temp > 0) {
        x += temp % 10;
        temp = Math.floor(temp/10);
    }
    x = Math.round(x/3); // turn 00-27 to 0-9
    x = 10-x; // flip 0-9 to 9-0
    x += 19; // 0-9 to 19-28
    return x;
}

function weight() {
    // http://www.scymed.com/en/smnxpn/pndhc226.htm
    // weight (lb) = BMI * (height, inch)^2 / 704
    return Math.round(bmi() * height() * height() / 704);
}

function weightImperial() {
    return weight() + "lbs ";
}

function weightMetric() {
    return Math.round(weight()/2.204) + "kg";
}

function emotionalStrength() {
    var surname = lastName();
    var x = surname.charCodeAt(surname.length-1); // (97, 122)
    return x;
}

function armStrength() {
    // https://strengthlevel.com/strength-standards/dumbbell-curl/lb
    // Determine level (beginner to advanced) based on id
    var strength = 0;
    var temp = id;
    var x = 1; // second digit * third digit
    while (temp >= 10) {
        x = x * (temp % 10);
        temp = Math.floor(temp/10);
    }
    x += temp; // ... + first digit (range is now from 0 to 81)
    x = x%4; // ... now 0 to 3

    switch (x) {
        case 0: // Beginner (0) : weight * 0.1
            strength = weight() * 0.1;
            break;
        case 1: // Novice (1) : weight * 0.17
            strength = weight() * 0.17;
            break;
        case 2: // Intermediate (2) : weight * 0.3
            strength = weight() * 0.3;
            break;
        case 3: // Advanced (3) : weight * 0.42
            strength = weight() * 0.42;
            break;
        default:
            break;
    }
    return Math.round(strength);
}

function laughter() {
    // https://www.tlc-direct.co.uk/Technical/Sounds/Decibles.htm (50-75 dB)
    var w = weight();
    var x = Math.floor(w/10); // first two digits of weight (14-21?)
    var y = Math.floor(w%10/2); // last digit of weight (0-4)
    var z = x-y; // (10-21)
    return Math.round(50 + (z-10)*(75-50)/(21-10)); // map (10-21) to (50-75)
}

function driverRating() {
    var emotion = emotionalStrength(); // (97-122)
    var x = id%10; // (0-9)
    var i = emotion-x; // (88, 122)
    i = 3 + (i-88)*(5-3)/(122-88); // map (88, 122) to (3-5)

    return Math.round(i*100)/100; // two decimal points
}

function randomNumber() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
    var number = Math.floor(Math.random() * (randomMax - randomMin + 1)) + randomMin;
    return number;
}