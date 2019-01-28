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
    document.getElementById('strength').innerHTML = strength() + "lbs";
    document.getElementById('uber').innerHTML = driverRating() + " stars";
    document.getElementById('laugh').innerHTML = laughter() + " dB";
}

function formatID() {
    // turn ID number into 3 digit
    var formattedID = id;
    if (id < 100) {
        formattedID = "0" + formattedID;
        if (id < 10) {
            formattedID = "0" + formattedID;
        }
    }
    return formattedID;
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
    return "?";
}

function emotionalStrength() {
    return "?";
}

function strength() {
    // https://strengthlevel.com/strength-standards/dumbbell-curl/lb
    // Determine level based on id
    var strength = 0;
    var temp = id;
    var x = 1; // second digit * third digit
    while (temp >= 10) {
        x = x * (temp % 10);
        temp = Math.floor(temp/10);
    }
    x += temp; // ... + first digit
    // range is now from 0 to 81
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

// based on id, generate a height using my awful and arbitrary mathematical function
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

function heightMetric(system) { // returns centimeters
    var totalInches = height();
    return Math.round(totalInches * 2.54) + "cm";
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
function randomNumber() {
    var number = Math.floor(Math.random() * (randomMax - randomMin + 1)) + randomMin;
    return number;
}

function name() {
    // http://random-name-generator.info/male-names
    var names = ["Aaron", "Abdul", "Adam", "Adrian", "Ahmed", "Albert", "Alejandro", "Alex", "Alfonzo", "Alfred", "Ali", "Allen", "Alton", "Andres", "Andrew", "Anthony", "Armando", "Art", "Arthur", "Austin", "Ben", "Benito", "Bill", "Brad", "Brendon", "Brent", "Brian", "Bruce", "Bruno", "Bryan", "Bud", "Buford", "Caleb", "Calvin", "Carl", "Carmelo", "Carter", "Chad", "Charles", "Charlie", "Chase", "Chris", "Christian", "Christopher", "Claudio", "Clay", "Cliff", "Colby", "Cole", "Dan", "Dane", "Daniel", "Dante", "Darell", "Darin", "Dario", "Darwin", "Dave", "David", "Denny", "Diego", "Domingo", "Drew", "Duncan", "Dustin", "Dusty", "Ed", "Edgar", "Edmund", "Edward", "Elliot", "Elroy", "Emil", "Eric", "Ernest", "Esteban", "Ethan", "Eugene", "Evan", "Fernando", "Frank", "Fred", "Gabe", "Gary", "Gene", "George", "Glen", "Graham", "Greg", "Gregory", "Hal", "Harry", "Hector", "Herbert", "Hugh", "Ian", "Isaac", "Jack", "Jackson", "Jake", "James", "Jason", "Jeffery", "Jim", "Jin", "Joe", "John", "Jon", "Jonathan", "Jose", "Joseph", "Josh", "Joshua", "Juan", "Jun", "Justin", "Karl", "Ken", "Kevin", "Kyle", "Larry", "Lawrence", "Leonard", "Lenny", "Lewis", "Liam", "Logan", "Louis", "Luis", "Luke", "Mark", "Matthew", "Michael", "Mike", "Miles", "Milo", "Minh", "Mo", "Mohammed", "Morris", "Ned", "Nicholas", "Nick", "Norman", "Norris", "Oliver", "Oscar", "Owen", "Patrick", "Paul", "Pete", "Peter", "Phil", "Phillip", "Porter", "Randy", "Ray", "Ricardo", "Rick", "Richard", "Rob", "Robbie", "Robert", "Roger", "Ron", "Ross", "Ryan", "Sal", "Sam", "Samuel", "Scott", "Sean", "Sebastian", "Seth", "Shane", "Sid", "Sonny", "Stan", "Stefan", "Stephen", "Steve", "Steven", "Stewart", "Ted", "Theo", "Theodore", "Tim", "Toby", "Tom", "Tommy", "Tony", "Troy", "Victor", "Vincent", "Walker", "Walter", "Warner", "Wes", "Will", "William", "Wilson", "Zachary"];

    // https://names.mongabay.com/data/1000.html
    var surnames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Le", "Li", "Liu", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Park", "Moon", "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson", "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes", "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez", "Powell", "Jenkins", "Perry", "Russell", "Sullivan", "Bell", "Coleman", "Butler", "Henderson", "Barnes", "Gonzales", "Fisher", "Vasquez", "Simmons", "Romero", "Jordan", "Patterson", "Alexander", "Hamilton", "Graham", "Reynolds", "Griffin", "Wallace", "Moreno", "West", "Cole", "Hayes", "Bryant", "Herrera", "Gibson", "Ellis", "Tran", "Medina", "Aguilar", "Stevens", "Murray", "Ford", "Castro", "Marshall", "Owens", "Harrison", "Fernandez", "McDonald", "Woods", "Washington", "Kennedy", "Wells", "Vargas", "Henry", "Chen", "Chan", "Chang", "Chung", "Freeman", "Webb", "Tucker", "Guzman", "Burns", "Crawford", "Olson", "Simpson", "Porter", "Hunter", "Gordon", "Mendez", "Silva", "Shaw", "Snyder", "Dixon", "Munoz", "Hunt", "Hicks", "Holmes", "Plamer", "Wagner", "Black", "Robertson"];

    return names[id%names.length] + " " + surnames[Math.round(id/2)%surnames.length];
}