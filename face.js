function face() {
    var container = document.getElementById('face-container');
    var width = container.getAttribute('width');
    var height = container.getAttribute('height');
    var centerX = width/2;
    var centerY = height/2;

    // ---------------------- FACE

    // jaw
    var jaw = document.getElementById('jaw');
    // ** jawWidth = 70% to 77% of (container) width **
    // ** depends on BMI: map BMI (17, 26) to (0.7, 0.77)**
    var jawWidth = 150 * (0.7 + (bmi-17)*(0.77-0.7)/(26-17));
    var jawTopY = height * 0.5; // jaw always starts at half the (container) height
    // ** jawHeight = 54% to 56% of (container) height **
    // ** depends on height: map height (63, 79) to (0.54, 0.56)
    var jawHeight = height * (0.54 + (totalHeight-63)*(0.56-0.54)/(79-63));

    var jawBottomY = jawTopY + jawHeight;
    var jawStartX = centerX - (jawWidth/2);
    var jawEndX = jawStartX + jawWidth;
    var jawX0 = centerX - (jawWidth/2);
    var jawX1 = centerX + (jawWidth/2);

    var jawStart = jawStartX + " " + jawTopY;
    var jawControl0 = jawX0 + " " + jawBottomY;
    var jawControl1 = jawX1 + " " + jawBottomY;
    var jawEnd = jawEndX + " " + jawTopY;

    jaw.setAttribute("d", "M " + jawStart + ", C " + jawControl0 + ", " + jawControl1 + ", " + jawEnd);
    console.log("d", "M " + jawStart + ", C " + jawControl0 + ", " + jawControl1 + ", " + jawEnd);

    // eyes
    var eyeColor = "#000000"; // color of pupil
    var eyeRadius = 4; // size of pupil
    // ** eyeDistance = 25% of jawWidth looks good **
    var eyeDistance = jawWidth * 0.25; // distance of each eye from center
    // ** eyeY = 37% to 40% of (container) height **
    // ** depends on Name: map Name (65, 90) to (0.37, 0.4)
    var eyeY = height * (0.37 + (fName.charCodeAt(0)-65)*(0.4-0.37)/(90-65));
    var eyes = document.getElementById('eyes').children;
    for (var i = 0; i < eyes.length; i++) {
        eyes[i].setAttribute("r", eyeRadius);
        eyes[i].setAttribute("fill", eyeColor);
        eyes[i].setAttribute("cy", eyeY);
        if (i == 0) { // left eye
            eyes[i].setAttribute("cx", centerX - eyeDistance);
        } else { // right eye
            eyes[i].setAttribute("cx", centerX + eyeDistance);
        }
    }

    // nose
    var nose = document.getElementById('nose');
    var noseTopX = centerX;
    // ** noseTopY = 45% to 50% of (container) height **
    // ** depends on name: map name (97, 122) to (0.45, 0.5)
    var noseTopY = height * (0.45 + (fName.charCodeAt(fName.length-1)-97)*(0.5-0.45)/(122-97));
    var noseTop = centerX + " " + noseTopY; // where nose begins at the top (near eyes)
    // ** noseTipWidth = 3% to 6% of (container) height **
    // ** depends on id: map id%10 (0-9) to (0.03, 0.06)
    var noseTipWidth = width * (0.03 + (id%10-0)*(0.06-0.03)/(9-0));
    // ** noseTipHeight = 3% to 5% of (container) height **
    // ** depends on laughter: map laughter%10 (0-9) to (0.03, 0.05)
    var noseTipHeight = height * (0.03 + (laughter%10-0)*(0.05-0.03)/(9-0));
    var noseTipX = noseTopX - noseTipWidth;
    var noseTipY = noseTopY + noseTipHeight;
    var noseTip = noseTipX + " " + noseTipY; // where nose is pointiest

    var noseEndX = noseTopX;
    var noseEndY = noseTipY + noseTipHeight;
    var noseEnd = noseEndX + " " + noseEndY;

    nose.setAttribute("d", "M " + noseTopX + " " + eyeY + ", L " + noseTop + ", L " + noseTip + ", L " + noseEnd);

    // mouth
    var mouth = document.getElementById('mouth');
    // ** mouthWidth = 25% to 45% of jawWidth **
    // ** depends on driverRating: map rating (3.9, 5) to (0.25, 0.45)
    var mouthWidth = jawWidth * (0.25 + (driverRating-3.9)*(0.45-0.25)/(5-3.9));
    var mouthStartX = centerX - (mouthWidth/2);
    var mouthEndX = mouthStartX + mouthWidth;
    // ** mouthY = 6% to 12% of (container) height below the nose
    // ** depends on surname: map surname (97, 122) to (0.06, 0.12)
    var mouthY = noseEndY + height * (0.06 + (lName.charCodeAt(lName.length-1)-97)*(0.12-0.06)/(122-97));
    // ** mouthBottomY = 6% to 12% of (container) height below mouthY
    // ** depends on emotionalStrength: map emotion (185, 244) to (0.06, 0.12)
    var mouthBottomY = mouthY + height * (0.06 + (emotionalStrength-185)*(0.12-0.06)/(244-185));

    var mouthX0 = mouthStartX + 5;
    var mouthX1 = mouthEndX - 5;

    var mouthStart = mouthStartX + " " + mouthY;
    var mouthEnd = mouthEndX + " " + mouthY;
    var mouthControl0 = mouthX0 + " " + mouthBottomY;
    var mouthControl1 = mouthX1 + " " + mouthBottomY;
    mouth.setAttribute("d", "M " + mouthStart + ", C " + mouthControl0 + ", " + mouthControl1 + ", " + mouthEnd);


    // ---------------------- FACIAL HAIR
    // ...
}