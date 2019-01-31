function bio() {
    return hello() + farewell();
}

function hello() {
    var date = new Date();
    var hour = date.getHours();

    var intro = "";
    if (hour < 4) {
        intro = "Good night! Aren't you up late? ";
    } else if (hour < 13) {
        intro = "Good morning! ";
    } else if (hour < 17) {
        intro = "Good afternoon! ";
    } else {
        intro = "Good evening! "
    }

    var name = "";
    name = "My name is " + firstName + ". ";

    return intro + name;
}

function farewell() {
    return "I love you. ";
}