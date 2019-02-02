function generateFace() {
    var container = document.getElementById('face-container');
    var width = container.getAttribute('width');
    var height = container.getAttribute('height');
    var centerX = width/2;
    var centerY = height/2;

    // ---------------------- FACE

    // -------------
    // jaw
    // -------------
    var jaw = document.getElementById('jaw');
    // ** jawWidth = 70% to 77% of (container) width **
    // ** depends on BMI: map BMI (17, 26) to (0.7, 0.77)**
    var jawWidth = width * (0.7 + (bmi-17)*(0.77-0.7)/(26-17));
    var jawTopY = height * 0.5; // jaw always starts at half the (container) height
    // ** jawHeight = 54% to 56% of (container) height **
    // ** depends on height: map height (63, 79) to (0.54, 0.56)
    var jawHeight = height * (0.54 + (heightInches-63)*(0.56-0.54)/(79-63));

    var jawBottomY = jawTopY + jawHeight;
    var jawStartX = centerX - (jawWidth/2);
    var jawEndX = jawStartX + jawWidth;
    var jawX0 = centerX - (jawWidth/2);
    var jawX1 = centerX + (jawWidth/2);

    var jawStart = jawStartX + " " + jawTopY;
    var jawControl0 = jawX0 + " " + jawBottomY;
    var jawControl1 = jawX1 + " " + jawBottomY;
    var jawEnd = jawEndX + " " + jawTopY;

    // -------------
    // blush
    // -------------
    var blush = document.getElementById('blush').children;
    var blushDistanceX = (jawWidth/3.5);
    var blushDistanceY = (jawWidth/4);
    for (var i = 0; i < blush.length; i++) {
        blush[i].setAttribute("fill", blushColor);
        blush[i].setAttribute("r", (jawWidth/7.5));
        if (i == 0) { // left
            blush[i].setAttribute("cx", (centerX - blushDistanceX));
        } else {
            blush[i].setAttribute("cx", (centerX + blushDistanceX));
        }

        blush[i].setAttribute("cy", (centerY + blushDistanceY));
    }



    jaw.setAttribute("d", "M " + jawStart + ", C " + jawControl0 + ", " + jawControl1 + ", " + jawEnd);

    // -------------
    // scalp
    // -------------
    var scalp = document.getElementById('scalp');
    var scalpTopY = jawTopY - jawHeight * 1.1;
    var scalpControl0 = jawX0 + " " + scalpTopY;
    var scalpControl1 = jawX1 + " " + scalpTopY;
    scalp.setAttribute("d", "M " + jawStart + ", C " + scalpControl0 + ", " + scalpControl1 + ", " + jawEnd);

    // -------------
    // eyes
    // -------------
    var eyeColor = "#000000"; // color of pupil
    var eyeRadius = 5; // size of pupil
    // ** eyeDistance = 25% of jawWidth looks good **
    var eyeDistance = jawWidth * 0.25; // distance of each eye from center
    // ** eyeY = 44% to 50% of (container) height **
    // ** depends on Name: map Name (65, 90) to (0.44, 0.5)
    var eyeY = height * (0.44 + (firstName.charCodeAt(0)-65)*(0.5-0.44)/(90-65));
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

    // -------------
    // glasses
    // -------------
    var glasses = document.getElementById('glasses').children;
    var hasGlasses = false;
    if ((bmi%10 + id%10)%10 < 6) {
        hasGlasses = true;
    }
    for (var i = 0; i < glasses.length; i++) {
        glasses[i].setAttribute("stroke", "white");
        glasses[i].setAttribute("fill", "transparent");
        var glassesY = eyeY;
        // ** glassesHeight = 6% to 10% of (container) width **
        // ** depends on armStrength: map strength%10 (0-9) to (0.06, 0.1)
        var glassesHeight = width * (0.06 + (armStrength%10-0)*(0.1-0.06)/(9-0));

        // ** glassesWidth = 1 to 1.4 * glassesHeight **
        // ** depends on bmi: map bmi%10 (0,9) to (1, 1.4)
        var glassesWidth = glassesHeight * (1 + (bmi%10-0)*(1.4-1)/(9-0));
        if (i < 2) { // lens
            if (hasGlasses) {
                glasses[i].setAttribute("rx", glassesWidth);
                glasses[i].setAttribute("ry", glassesHeight);

                if (i == 0) { // left eye
                    glasses[i].setAttribute("cx", centerX - eyeDistance);
                } else {
                    glasses[i].setAttribute("cx", centerX + eyeDistance);
                }
                glasses[i].setAttribute("cy", glassesY);
            } else {
                glasses[i].setAttribute("rx", 0);
                glasses[i].setAttribute("ry", 0);
            }
        } else {
            if (hasGlasses) {
                 var bridgeStartX = centerX - eyeDistance + glassesWidth;
                var bridgeEndX = centerX + eyeDistance - glassesWidth;
                var bridgeY = glassesY;
                var bridgeStart = bridgeStartX + " " + bridgeY;
                var bridgeEnd = bridgeEndX + " " + bridgeY;

                var bridgeMidX = (bridgeStartX + bridgeEndX)/2;
                // ** bridgeCurveHeight = 2% to 7% of (container) height **
                // ** depends on id: map id%10 (0,9) to (0.02, 0.07)
                var bridgeCurveHeight = height * (0.02 + (id%10-0)*(0.07-0.02)/(9-0));
                var bridgeMidY = bridgeY - bridgeCurveHeight;
                var bridgeMid = bridgeMidX + " " + bridgeMidY;
                glasses[i].setAttribute("d", "M " + bridgeStart + ", Q " + bridgeMid + " " + bridgeEnd);
            } else {
                glasses[i].setAttribute("d", "");
            }

        }
    }

    // -------------
    // eyebrows
    // -------------
    var brows = document.getElementById('eyebrows').children;
    // ** browThickness = 4 to 9 **
    // ** depends on emotionalWeight: emotion/10%10 (0,9) to (4,9);
    var browThickness = (4 + (emotionalWeight/10%10-0)*(9-4)/(9-0));

    var browDistance = jawWidth * 0.12;
    var browLength = jawWidth * 0.25;
    // ** browY = 2% to 4% of (container) height
    // ** depends on height: height%10 (0,9) to (0.02,0.04);
    var browY = eyeY - height * (heightInches%10-0)*(0.04-0.02)/(9-0);
    if (Math.round(driverRating*100%10 %3) == 0) {
        var browStartY = browY - 10;
        var browEndY = browY - 5;
        var browMidY = (browStartY+browEndY)/2;
    } else if (Math.round(driverRating*100%10 %3) == 1) {
        var browStartY = browY - 5;
        var browEndY = browY - 10;
        var browMidY = (browStartY+browEndY)/2;
    } else {
        var browStartY = browY - 7;
        var browMidY = browStartY - 5;
        var browEndY = browY - 7;
    }
    for (var i = 0; i < brows.length; i++) {
        if (i == 0) { // left eye
            var browStartX = centerX - browDistance;
            var browEndX = browStartX - browLength;
        } else { // right eye
            var browStartX = centerX + browDistance;
            var browEndX = browStartX + browLength;
        }
        var browStart = browStartX + " " + browStartY;
        var browMidX = (browStartX+browEndX)/2;
        var browMid = browMidX + " " + browMidY;
        var browEnd = browEndX + " " + browEndY;
        brows[i].setAttribute("d", "M " + browStart + ", Q " + browMid + " " + browEnd);
        brows[i].setAttribute("stroke-width", browThickness);
        brows[i].setAttribute("stroke-linecap", "round");
        brows[i].setAttribute("stroke", hairColor);
    }

    // -------------
    // nose
    // -------------
    var nose = document.getElementById('nose');
    var noseTopX = centerX;
    // ** noseTopY = 50% to 55% of (container) height **
    // ** depends on name: map name (97, 122) to (0.5, 0.55)
    var noseTopY = height * (0.5 + (firstName.charCodeAt(firstName.length-1)-97)*(0.55-0.5)/(122-97));

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

    // -------------
    // mouth
    // -------------
    var mouth = document.getElementById('mouth');
    // ** mouthWidth = 25% to 45% of jawWidth **
    // ** depends on driverRating: map rating (3.9, 5) to (0.25, 0.45)
    var mouthWidth = jawWidth * (0.25 + (driverRating-3.9)*(0.45-0.25)/(5-3.9));
    var mouthStartX = centerX - (mouthWidth/2);
    var mouthEndX = mouthStartX + mouthWidth;
    // ** mouthY = 5% to 9% of (container) height below the nose
    // ** depends on surname: map surname (97, 122) to (0.05, 0.09)
    var mouthY = noseEndY + height * (0.05 + (lastName.charCodeAt(lastName.length-1)-97)*(0.09-0.05)/(122-97));
    // ** mouthBottomY = 6% to 12% of (container) height below mouthY
    // ** depends on emotionalWeight: map emotion (185, 244) to (0.06, 0.12)
    var mouthBottomY = mouthY + height * (0.06 + (emotionalWeight-185)*(0.12-0.06)/(244-185));

    var mouthX0 = mouthStartX + 5;
    var mouthX1 = mouthEndX - 5;

    var mouthStart = mouthStartX + " " + mouthY;
    var mouthEnd = mouthEndX + " " + mouthY;
    var mouthControl0 = mouthX0 + " " + mouthBottomY;
    var mouthControl1 = mouthX1 + " " + mouthBottomY;
    mouth.setAttribute("d", "M " + mouthStart + ", C " + mouthControl0 + ", " + mouthControl1 + ", " + mouthEnd);


    // -------------
    // mustache
    // -------------
    if (Math.abs(id%10-weightImperial%10) > 3) {
        if (id%10 > weightImperial%10) {
            broomStache(jawWidth, centerX, noseEndY, height);
        } else {
            // ** mustacheCoefficient = -0.02 to 0.2 **
            // ** the higher the subtraction, the curlier and twirled up
            // ** the higher the addition, the smoother and droopier
            // ** depends on id and weight: map id%10-weight%10 (-9, 9) to (-0.02, 0.2)
            var mustacheCoefficient = -0.02 + ((id%10-weightImperial%10)+9)*(0.2+0.02)/(9+9); // [-0.02, 0.2]
            pringlesMustache(jawWidth, height, noseEndY, centerY, centerX, mustacheCoefficient);
        }
    } else  {
        var mustache = document.getElementById('mustache').children;
        for (var i = 0; i < mustache.length; i++) {
            mustache[i].setAttribute("d", "");
        }
    }
}

function broomStache(jawWidth, centerX, noseEndY, height) {
    var mustache = document.getElementById('mustache').children;
    var stacheWidth = jawWidth * 0.56;

    var stacheLeftX = centerX - (stacheWidth/2);
    var stacheRightX = centerX + (stacheWidth/2);
    var stacheTopX = (stacheLeftX + stacheRightX)/2;
    var stacheTopY = noseEndY - height*0.1;
    var stacheHeight = height*0.2;
    var stacheY0 = stacheTopY + stacheHeight;


    var stacheLeft = stacheLeftX + " " + stacheY0;
    var stacheRight = stacheRightX + " " + stacheY0;
    var stacheTopCenter = stacheTopX + " " + stacheTopY;
    mustache[0].setAttribute("d", "M " + stacheRight + ", Q " + stacheTopCenter + " " + stacheLeft);

    var stacheY1 = stacheY0 + 5;

    if (id%10%2 == 0) {
        var increment = stacheWidth/6;
    } else {
        var increment = stacheWidth/5;
    }
    for (var i = stacheLeftX; (stacheRightX-i) > 1; i += increment) {
        var x1 = i + increment;
        var x0 = (i + x1)/2;
        var coord0 = x0 + " " + stacheY1;
        var coord1 = x1 + " " + stacheY0;
        mustache[0].setAttribute("d", mustache[0].getAttribute("d") + ", Q " + coord0 + " " + coord1);
    }

    mustache[0].setAttribute("stroke-width", 1);
    mustache[0].setAttribute("fill", hairColor);
    mustache[0].setAttribute("stroke", hairColor);
    mustache[1].setAttribute("d", "");
}

function pringlesMustache(jawWidth, height, noseEndY, centerY, centerX, mustacheCoefficient) {
    var mustache = document.getElementById('mustache').children;
    for (var i = 0; i < mustache.length; i++) {
        var stacheWidth0 = jawWidth * 0.05;
        var stacheTopHeight = height * 0.04; // the higher the curvier
        var stacheWidth1 = jawWidth * 0.1;
        var stacheBottomHeight = height * 0.3; // the higher the thicker
        var stacheWidth2 = jawWidth * 0.2;
        var stacheWidth3 = stacheWidth0;

        var stacheCenterY = noseEndY + height * 0.02;
        var stacheTopY = stacheCenterY - stacheTopHeight;
        var stacheBottomY = centerY + stacheBottomHeight;
        var stacheEndY = stacheCenterY + height * mustacheCoefficient;

        if (i == 0) { // left
            var stacheTopX = centerX - stacheWidth0;
            var stacheDipX = stacheTopX - stacheWidth1;
            var stacheEndX = stacheDipX - stacheWidth2;
            var stacheBottomX = centerX - stacheWidth3;
        } else {
            var stacheTopX = centerX + stacheWidth0;
            var stacheDipX = stacheTopX + stacheWidth1;
            var stacheEndX = stacheDipX + stacheWidth2;
            var stacheBottomX = centerX + stacheWidth3;
        }

        var stacheCenter = centerX + " " + stacheCenterY;
        var stacheTop = stacheTopX + " " + stacheTopY;
        var stacheDip = stacheDipX + " " + stacheCenterY;
        var stacheEnd = stacheEndX + " " + stacheEndY;
        var stacheBottom = stacheBottomX + " " + stacheBottomY;
        mustache[i].setAttribute("d", "M " + stacheCenter + ", Q " + stacheTop + " " + stacheDip + " , T " + stacheEnd + ", Q " + stacheBottom + " " + stacheCenter);
        mustache[i].setAttribute("stroke-width", 1);
        mustache[i].setAttribute("fill", hairColor);
    }
}