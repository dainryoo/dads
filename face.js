function face() {
    var container = document.getElementById('face-container');
    var width = container.getAttribute('width');
    var height = container.getAttribute('height');

    var centerX = width/2;

    // jaw
    var jaw = document.getElementById('jaw');
    var jawWidth = 100;
    var jawHeight = 65;
    var jawTopY = 80;

    var jawBottomY = jawTopY + jawHeight;
    var jawStartX = centerX - (jawWidth/2);
    var jawEndX = jawStartX + jawWidth;
    var jawX0 = centerX - (jawWidth/2);
    var jawX1 = centerX + (jawWidth/2);

    var jawStart    = jawStartX   + " " + jawTopY;
    var jawControl0 = jawX0  + " " + jawBottomY;
    var jawControl1 = jawX1  + " " + jawBottomY;
    var jawEnd      = jawEndX + " " + jawTopY;

    jaw.setAttribute("d", "M " + jawStart + ", C " + jawControl0 + ", " + jawControl1 + ", " + jawEnd);
    console.log("d", "M " + jawStart + ", C " + jawControl0 + ", " + jawControl1 + ", " + jawEnd);

    // eyes
    var eyeColor = "#000000"; // color of pupil
    var eyeRadius = 3; // size of pupil
    var eyeDistance = 20; // distance of each eye from center
    var eyeY = 50;
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
    var noseTopY = eyeY;
    var noseTop = centerX + " " + eyeY; // where nose begins at the top (near eyes)

    var noseLength = 5;
    var noseBridgeLength = 10;
    var noseTipX = noseTopX - noseLength;
    var noseTipY = noseTopY + noseBridgeLength;
    var noseTip = noseTipX + " " + noseTipY; // where nose is pointiest

    var noseEndX = noseTopX;
    var noseEndY = noseTipY + 10;
    var noseEnd = noseEndX + " " + noseEndY;

    nose.setAttribute("d", "M " + noseTop + ", L " + noseTip + ", L " + noseEnd);

    // mouth
    var mouth = document.getElementById('mouth');
    var mouthWidth = 20;
    var mouthStartX = centerX - (mouthWidth/2);
    var mouthEndX = mouthStartX + mouthWidth;
    var mouthY = jawTopY + 20;
    var mouthBottomY = mouthY + 10;

    var mouthX0 = mouthStartX + 5;
    var mouthX1 = mouthEndX - 5;

    var mouthStart = mouthStartX + " " + mouthY;
    var mouthEnd = mouthEndX + " " + mouthY;
    var mouthControl0 = mouthX0 + " " + mouthBottomY;
    var mouthControl1 = mouthX1 + " " + mouthBottomY;
    mouth.setAttribute("d", "M " + mouthStart + ", C " + mouthControl0 + ", " + mouthControl1 + ", " + mouthEnd);
}
